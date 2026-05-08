
const database = require("../../config/database");

<<<<<<< HEAD
function listar(usuarioId, parceiroId) {
    const sql = `SELECT id, nome, fkUsuario FROM convidado WHERE fkUsuario = ? or id_usuario = ?;`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

function adicionar(nome, usuarioId) {
    const sql = `INSERT INTO convidado (nome, id_usuario) VALUES (?, ?);`;
=======
function listar(usuarioId) {
    const sql = `SELECT id, nome FROM convidado WHERE fkUsuario = ?`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(nome, usuarioId) {
    const sql = `INSERT INTO convidado (nome, fkUsuario) VALUES (?, ?)`;
>>>>>>> 987268c (ponto salvo)
    return database.executar(sql, [nome, usuarioId]);
}

function remover(nome) {
    const sql = `DELETE FROM convidado WHERE nome = ?;`;
    return database.executar(sql, [nome]);
}

function totalConvidado(usuarioId, parceiroId) {
    const sql = `SELECT COUNT(*) AS total FROM convidado WHERE fkUsuario = ? or id_usuario = ?;`;
    return database.executar(sql, [usuarioId, parceiroId]);
}

module.exports = {
    listar,
    adicionar,
    remover,
    totalConvidado
};
