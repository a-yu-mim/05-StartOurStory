
const database = require("../database/config");

function listar(usuarioId) {
    const sql = `SELECT id, valor FROM economia WHERE id_usuario = ?`;
    return database.executar(sql, [usuarioId]);
}

function adicionar(valor, usuarioId) {
    const sql = `INSERT INTO economia (valor, id_usuario) VALUES (?, ?)`;
    return database.executar(sql, [valor, usuarioId]);
}

function remover(valor, usuarioId) {
//  const sql = `DELETE FROM economia WHERE valor = ?`; 
    const sql = `INSERT INTO economia (valor, id_usuario) VALUES (-?, ?)`;
    return database.executar(sql, [valor, usuarioId]);
}

module.exports = {
    listar,
    adicionar,
    remover
};
