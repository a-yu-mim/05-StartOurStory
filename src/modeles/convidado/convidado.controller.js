const convidadoModel = require("./convidado.model");

function listar(req, res) {
    const usuarioId = req.params.usuarioId;
    if (usuarioId === undefined) {
        res.status(400).send("Usuário não informado");
    } else {
        convidadoModel.listar(usuarioId)
        .then(convidados => res.json(convidados))
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}

function adicionar(req, res) {
    const { nome, usuarioId } = req.body;
    if (nome === undefined) {
        res.status(400).send("Convidado não informado");
    } else if (usuarioId === undefined) {
        res.status(400).send("Usuário não informado");
    } else {
        convidadoModel.listar(usuarioId)
        .then(convidados => {
            if (convidados.some(c => c.nome === nome)) {
                res.status(409).send("Convidado já informado");
            } else {
                convidadoModel.adicionar(nome, usuarioId)
                .then(() => res.status(201).send())
                .catch(err => {
                        console.log(err);
                        res.status(500).json({ erro: err.message });
                    });
                }
            })
            .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
    }
}

function remover(req, res) {
    const nome = req.params.id;
    if (nome === undefined) {
        res.status(400).send("Nome não informado");
    } else {
        convidadoModel.remover(nome)
        .then(() => res.status(204).send())
            .catch(err => {
                console.log(err);
                res.status(500).json({ erro: err.message });
            });
        }
    }
    
function totalConvidado(req, res) {
    convidadoModel.totalConvidado()
        .then(resultado => res.json(resultado[0]))
        .catch(err => {
            console.log(err);
            res.status(500).json({ erro: err.message });
        });
}

    module.exports = {
    listar,
    adicionar,
    remover,
    totalConvidado
};
