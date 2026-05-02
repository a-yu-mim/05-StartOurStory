
const economiaModel = require("./economia.model");

function listar(req, res) {
    const usuarioId = req.params.usuarioId;
    if (usuarioId === undefined) {
        res.status(400).send("Usuário não informado");
    } else {
        economiaModel.listar(usuarioId)
        .then(economias => res.json(economias))
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}

function adicionar(req, res) {
    const { valor, usuarioId } = req.body;
    if (valor === undefined) {
        res.status(400).send("Valor não informado");
    } else if (usuarioId === undefined) {
        res.status(400).send("Usuário não informado");
    } else {
        economiaModel.adicionar(valor, usuarioId)
        .then(() => res.status(201).send())
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}

function remover(req, res) {
    const valor = req.params.id;
    const usuarioId = req.params.usuarioId;
    if (valor === undefined || usuarioId === undefined) {
        res.status(400).send("Valor ou usuarioId não informado");
    } else {
        economiaModel.remover(valor, usuarioId)
        .then(() => res.status(204).send())
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}
    
function totalEconomia(req, res) {
    const usuarioId = req.params.usuarioId;
    if (usuarioId === undefined) {
        res.status(400).send("Usuário não informado");
    } else {
        economiaModel.totalEconomia(usuarioId)
        .then(resultado => res.json(resultado[0]))
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}
    module.exports = {
    listar,
    adicionar,
    remover,
    totalEconomia
};
