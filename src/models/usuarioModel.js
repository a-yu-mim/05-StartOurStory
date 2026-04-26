// ------------------------------------------------
//   Manipula dados do usuários no Banco de Dados
// ------------------------------------------------

const database = require("../database/config")

function cadastrar(nome, email, senha) {
    const instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    return database.executar(instrucaoSql, [nome, email, senha]);
}

function autenticar(email, senha) {
    const instrucaoSql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

module.exports = {
    cadastrar,
    autenticar
};