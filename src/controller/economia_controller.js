
const economiaModel = require("../model/economia_model.js");
const usuarioModel = require("../model/usuario_model.js");

function adicionar(req, res) {
    const valor = req.body.valor;
    const usuarioId = req.body.usuarioId;

    if (!valor) {
        res.status(400).send("Valor não informado");
        return;
    } else if (!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    } 

    economiaModel.adicionar(valor, usuarioId)
        .then(() => res.status(201).send())
        .catch(err => res.status(500).json({ erro: err.message }));
};

function remover(req, res) {
    const id = req.params.id;
    const usuarioId = req.params.usuarioId;

    if (!id || !usuarioId) {
        res.status(400).send("id ou usuarioId não informado");
        return;
    } 
        
    economiaModel.remover(id, usuarioId)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ erro: err.message }));
};

function totalEconomia(req, res) {
    const usuarioId = req.params.usuarioId;

    if(!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }

    usuarioModel.buscarPorId(usuarioId)
        .then(lista => {
            const parceiroId = lista[0].fkParceiro || null;
            return economiaModel.totalEconomia(usuarioId, parceiroId);
        })
        .then(resultado => res.json(resultado[0]))
        .catch(err => res.status(500).json({ erro: err.message }));
};

function listarTodos(req, res) {
    const usuarioId = req.params.usuarioId;

    if(!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }

    usuarioModel.buscarPorId(usuarioId)
        .then(lista => {
            const parceiroId = lista[0].fkParceiro || null;
            return economiaModel.listarTodos(usuarioId, parceiroId);
        })
        .then(lista => res.json(lista))
        .catch(err => res.status(500).json({ erro: err.message }));
}

function listarSoMeusValores(req, res) {
    const usuarioId = req.params.usuarioId;

    if(!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }
    
    economiaModel.listarSoMeusValores(usuarioId)
        .then(lista => res.json(lista))
        .catch(err => res.status(500).json({ erro: err.message }));
}

module.exports = {
    adicionar,
    remover,
    totalEconomia,
    listarTodos,
    listarSoMeusValores
};
