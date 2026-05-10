
let database = require("../../config/database");

function listar(usuarioId, parceiroId) {
    let sql = `SELECT id, nome, fkUsuario FROM convidado WHERE fkUsuario = ? OR fkUsuario = ?;`;
    return database.executar(sql, [usuarioId, parceiroId]);
}
function listarSoMeus(usuarioId) {
    let sql = `SELECT id, nome FROM convidado WHERE fkUsuario = ?;`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(nome, usuarioId) {
    let sql = `INSERT INTO convidado (nome, fkUsuario) VALUES (?, ?);`;
    return database.executar(sql, [nome, usuarioId]);
}

function remover(nome) {
    let sql = `DELETE FROM convidado WHERE nome = ?;`;
    return database.executar(sql, [nome]);
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
