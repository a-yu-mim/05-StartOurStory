
const database = require("../database/config");


function listar(usuarioId) {
    const sql = `SELECT id, nome FROM convidado WHERE id_usuario = ?`;
    return database.executar(sql, [usuarioId]);
}


function adicionar(nome, usuarioId) {
    const sql = `INSERT INTO convidado (nome, id_usuario) VALUES (?, ?)`;
    return database.executar(sql, [nome, usuarioId]);
}


function remover(nome) {
    const sql = `UPDATE convidado SET nome = NULL WHERE nome = ?`;
    return database.executar(sql, [nome]);
}

module.exports = {
    listar,
    adicionar,
    remover
};
