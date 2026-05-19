
const listaModel = require("../model/lista_model.js");

function listar(req, res) {
    listaModel.listar()
        .then(function (convidados) {
            res.json(convidados);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
}

function remover(req, res) {
    let nome = req.params.id;

    if (nome == undefined) {
        res.status(400).send("Nome não informado");
    } else {
        listaModel.remover(nome)
            .then(function () {
                res.status(204).send();
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({ erro: err.message });
            });
    }
}

module.exports = {
    listar,
    remover
};
