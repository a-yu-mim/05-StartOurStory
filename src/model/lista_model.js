
let database = require("../config/database.js");

function listar() {
    let sql = `SELECT id, nome FROM convidado`;
    return database.executar(sql);
}

function remover(nome) {
    let sql = `DELETE FROM convidado WHERE nome = ?`;
    return database.executar(sql, [nome]);
}

module.exports = {
    listar,
    remover,
};
