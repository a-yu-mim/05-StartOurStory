
const convidadoModel = require("./convidado.model");
const usuarioModel = require("../usuario/usuario.model");

function listar(req, res) {
    const usuarioId = req.params.usuarioId;

    if (!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    } 
    
    usuarioModel.buscarPorId(usuarioId)
        .then(lista => {
            const parceiroId = lista[0].fkParceiro || null;
            return convidadoModel.listar(usuarioId, parceiroId);
        })
        .then(lista => res.json(lista))
        .catch(err => res.status(500).json({ erro: err.message }));
};

function adicionar(req, res) {
    const nome = req.body.nome;
    const usuarioId = req.body.usuarioId;

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
    const nome = req.params.id;

    if (!nome) {
        res.status(400).send("Nome não informado");
        return;                 
    }

    convidadoModel.remover(nome)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ erro: err.message }));
};
    
function totalConvidado(req, res) {
    const usuarioId = req.params.usuarioId;

    if(!usuarioId) {
        res.status(400).send("Usuário não informado");
        return;
    }
    
    usuarioModel.buscarPorId(usuarioId)
        .then(lista => {
            const parceiroId = lista[0].fkParceiro || null;
            return convidadoModel.totalConvidado(usuarioId, parceiroId);
        })
        .then(lista => res.json(lista[0]))
        .catch(err => res.status(500).json({ erro: err.message }));
};

    module.exports = {
    listar,
    adicionar,
    remover,
    totalConvidado
};
