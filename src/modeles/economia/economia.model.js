
const database = require("../../config/database");

function listar(usuarioId) {
    const sql = `SELECT id, valor FROM economia WHERE id_usuario = ?`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(valor, usuarioId) {
    const sql = `INSERT INTO economia (valor, id_usuario) VALUES (?, ?)`;
    return database.executar(sql, [valor, usuarioId]);
}

function remover(id, usuarioId) {
    const sql = `DELETE FROM economia WHERE id = ? AND id_usuario = ?`;
    return database.executar(sql, [id, usuarioId]);
}

function totalEconomia() {
    const sql = `SELECT SUM(valor) AS total FROM economia`;
    return database.executar(sql);
}

function listarTodos() {
    const sql = `SELECT valor FROM economia WHERE valor > 0 ORDER BY id ASC`;
    return database.executar(sql);
}

module.exports = {
    listar,
    adicionar,
    remover,
    totalEconomia,
    listarTodos
};
