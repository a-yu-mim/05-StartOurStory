
let database = require("../config/database.js");

function listar(idUsuario) {
    let sql = `
        SELECT c.nome 
            FROM usuario u JOIN convidado c 
            ON c.fkUsuario = u.id OR c.fkUsuario = u.fkParceiro
            WHERE u.id = ?
        `;
    return database.executar(sql, [idUsuario]);
}

function remover(nome) {
    let sql = `DELETE FROM convidado WHERE nome = ?`;
    return database.executar(sql, [nome]);
}

module.exports = {
    listar,
    remover,
};
