
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
        
        if (!codigo) {
            let codigoGerado = gerarCodigoAleatorio();

            return usuarioModel.cadastrar(nome, email, senha, null)

            .then(function (resultado) {
                return usuarioModel.gerarCodigo(
                    resultado.insertId, 
                    codigoGerado
                );
            })
            .then(function () {
                res
                    .status(201)
                    .send("Cadastro efetuado!");
            })
            .catch(function (erro) {
                res
                    .status(500)
                    .send("Erro ao realizar cadastro.");
            });
        }

        usuarioModel.buscarPorCodigo(codigo)

        .then(function (lista) {

            if (lista.length == 0 || lista[0].fkParceiro != null) {
                return res
                    .status(400)
                    .send("Código inválido ou já utilizado.");
            }

            let idParceiro = lista[0].id;
            let idNovoUsuario;

            return usuarioModel.cadastrar(nome, email, senha, idParceiro)
                
                .then(function (resultado) {
                    idNovoUsuario = resultado.insertId;
                    
                    return usuarioModel.vincularParceiro(idParceiro, idNovoUsuario);
                })
                .then(function () {
                    return usuarioModel.gerarCodigo(idNovoUsuario, gerarCodigoAleatorio()
                    );
                })
                .then(function () {
                    res
                        .status(201)
                        .send("Cadastro efetuado! Parceiro vinculado!");
                });
        })
        .catch(function (erro) {
            res.
                status(500)
                .send("Erro ao realizar o cadastro.");
        });
    }

function autenticar(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha) {
        return res
            .status(400)
            .send("Preencha todos os campos.");
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
                res
                    .status(403)
                    .send("Email ou senha inválidos.");
            }
        })
        .catch(function (erro) {
            res
                .status(500)
                .send("Erro ao realizar login.");
        });
}

function buscarParceiro(req, res) {
    let usuarioId = req.params.usuarioId;

    usuarioModel.buscarParceiro(usuarioId)

        .then(function (lista) {
            if (lista.length == 0) {
                return res
                    .status(404)
                    .send("Parceiro não encontrado.");
            }
            res.json(lista[0]);
        })
        .catch(function (erro) {
            res
                .status(500)
                .send("Erro ao buscar parceiro.");
        });
}

module.exports = {
    cadastrar,
    autenticar,
    buscarParceiro
}