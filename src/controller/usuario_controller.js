
const usuarioModel = require("../model/usuario_model.js");

let lista = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
             "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
             "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
             "U", "V", "W", "X", "Y", "Z"];

function gerarCodigoAleatorio() {
    let codigo = "";
    for (let i = 0; i < 10; i++) {
    let caracter = Math.floor(Math.random() * lista.length);
        codigo += lista[caracter];
    }
    return codigo;
}

function cadastrar(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const codigo = req.body.codigo || null;
    
    if (!nome || !email || !senha) {
        res.status(400).send("Preencha todos os campos.");
        return;
    }
    
    if (!codigo) {
        const codigoGerado = gerarCodigoAleatorio();

        usuarioModel.cadastrar(nome, email, senha, null)
            .then(resultado =>
                usuarioModel.gerarCodigo(resultado.insertId, codigoGerado))
            .then(() => {
                res.status(201).json({ message: "Cadastro efetuado!" });
            })
            .catch((err) => {
                res.status(500).json(err.sqlMessage);
            });
        return;
    }
    
    usuarioModel.buscarPorCodigo(codigo)
        .then(function (lista) {
            if (lista.length == 0 || lista[0].fkParceiro != null) {
                res.status(400).json({ message: "Código inválido ou já utilizado." });
                return;
            }

            const idParceiro = lista[0].id;
            let idNovoUsuario;

            return usuarioModel.cadastrar(nome, email, senha, idParceiro)
                .then(resultado => {
                    idNovoUsuario = resultado.insertId;
                    return usuarioModel.vincularParceiro(idParceiro, idNovoUsuario);
                })
                .then(() => usuarioModel.gerarCodigo(idNovoUsuario, gerarCodigoAleatorio()))
                .then(() => res.status(201).json({ message: "Cadastro efetuado! Parceiro vinculado!" }));
        })
        .catch(err => res.status(500).json(err.sqlMessage));
}


function autenticar(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        res.status(400).send("Preencha todos os campos.");
        return;
    }

    usuarioModel.autenticar(email, senha)
        .then(function (lista) {
            if (lista.length == 1) {
                res.json({
                    id:    lista[0].id,
                    email: lista[0].email,
                    nome:  lista[0].nome
                });
            } else {
                res.status(403).send("Email ou senha inválidos.");
            }
        })
            .catch((err) => res.status(500).json(err.sqlMessage));
}

function buscarParceiro(req, res) {
    let usuarioId = req.params.usuarioId;

    usuarioModel.buscarParceiro(usuarioId)
        .then(function (lista) {
            if (lista.length == 0) {
                res.status(404).json({ message: "Parceiro não encontrado." });
                return;
            }
            res.json(lista[0]);
        })
        .catch((err) => res.status(500).json(err.sqlMessage));
}

module.exports = {
    cadastrar,
    autenticar,
    buscarParceiro
}