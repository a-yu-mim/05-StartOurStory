
const convidadoModel = require("../model/convidado_model.js");
const usuarioModel = require("../model/usuario_model.js");

function listarSoMeus(req, res) {
    let usuarioId = req.params.usuarioId;

    if (!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }

    convidadoModel.listarSoMeus(usuarioId)
        .then(lista => res.json(lista))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function adicionar(req, res) {
    let nome = req.body.nome;
    let usuarioId = req.body.usuarioId;

    if (!nome) {
        res.status(400).send("Convidado não informado");
        return;
    } else if (!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    } 

    convidadoModel.adicionar(nome,usuarioId)
        .then(() => res.status(201).send("Convidado já informado"))
        .catch(err => res.status(500).json({ erro: err.message }));
};
               
function remover(req, res) {
    let id = req.params.id;

    if (!id) {
        res.status(400).send("Nome não informado");
        return;                 
    }

    convidadoModel.remover(id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ erro: err.message }));
};
    
function totalConvidado(req, res) {
    let usuarioId = req.params.usuarioId;

    if(!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }
    
    usuarioModel.buscarPorId(usuarioId)
        .then(lista => {
            let parceiroId = lista[0].fkParceiro || null;
            return convidadoModel.totalConvidado(usuarioId, parceiroId);
        })
        .then(lista => res.json(lista[0]))
        .catch(err => res.status(500).json({ erro: err.message }));
};

module.exports = {
    listarSoMeus,
    adicionar,
    remover,
    totalConvidado
};
