
const database = require("../config/database.js");

function listar(usuarioId, parceiroId) {
    const sql = `SELECT id, valor, fkUsuario FROM economia WHERE fkUsuario = ? OR fkUsuario = ?`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

function adicionar(valor, usuarioId) {
    const sql = `INSERT INTO economia (valor, fkUsuario) VALUES (?, ?)`;
    return database.executar(sql, [valor, usuarioId]);
}

function remover(id, usuarioId) {
    const sql = `DELETE FROM economia WHERE id = ? AND fkUsuario = ?`;
    return database.executar(sql, [id, usuarioId]);
}

function totalEconomia(usuarioId, parceiroId) {
    const sql = `SELECT SUM(valor) AS total FROM economia WHERE fkUsuario = ? OR fkUsuario = ?`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

function listarTodos(usuarioId, parceiroId) {
    const sql = `SELECT valor FROM economia WHERE (fkUsuario = ? OR fkUsuario = ?) AND valor > 0 ORDER BY id ASC`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

function listarSoMeusValores(usuarioId) {
    const sql = `SELECT id, valor FROM economia WHERE fkUsuario = ? AND valor > 0`;
    return database.executar(sql, [usuarioId]);
}

module.exports = {
    listar,
    adicionar,
    remover,
    totalEconomia,
    listarTodos,
    listarSoMeusValores
};
