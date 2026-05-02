const database = require("../../config/database");

function listar(usuarioId) {
    const sql = `SELECT id, nome FROM convidado WHERE id_usuario = ?`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(nome, usuarioId) {
    const sql = `INSERT INTO convidado (nome, id_usuario) VALUES (?, ?)`;
    return database.executar(sql, [nome, usuarioId]);
}

function remover(nome) {
    const sql = `DELETE FROM convidado WHERE nome = ?`;
    return database.executar(sql, [nome]);
}

function totalConvidado() {
    const sql = `SELECT COUNT(*) AS total FROM convidado`;
    return database.executar(sql);
}

module.exports = {
    listar,
    adicionar,
    remover,
    totalConvidado
};
