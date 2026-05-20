
const database = require("../config/database.js");

function listar(usuarioId, parceiroId) {
    let sql = `SELECT id, nome, fkUsuario FROM convidado WHERE fkUsuario = ? OR fkUsuario = ?;`;
    return database.executar(sql, [usuarioId, parceiroId]);
}
function listarSoMeus(usuarioId) {
    let sql = `SELECT id, nome FROM convidado WHERE fkUsuario = ?;`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(id, usuarioId) {
    let sql = `INSERT INTO convidado (id, fkUsuario) VALUES (?, ?);`;
    return database.executar(sql, [id, usuarioId]);
}

function remover(id) {
    let sql = `DELETE FROM convidado WHERE id = ?;`;
    return database.executar(sql, [id]);
}

function totalConvidado(usuarioId, parceiroId) {
    let sql = `SELECT COUNT(*) AS total FROM convidado WHERE fkUsuario = ? OR fkUsuario = ?;`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

module.exports = {
    listar,
    listarSoMeus,
    adicionar,
    remover,
    totalConvidado
};
