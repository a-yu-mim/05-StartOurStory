
const database = require("../../config/database")

function cadastrar(nome, email, senha, fkParceiro) {
    const sql = `INSERT INTO usuario (nome, email, senha, fkParceiro) VALUES (?, ?, ?, ?);`;
    return database.executar(sql, [nome, email, senha, fkParceiro]);
}

function autenticar(email, senha) {
    const sql = `SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?;`;
    return database.executar(sql, [email, senha]);
}

function buscarPorCodigo(codigo) {
    const sql = `SELECT u.id, u.fkParceiro FROM codigo c JOIN usuario u ON c.fkUsuario = u.id WHERE c.codigo = ?;`;
    return database.executar(sql, [codigo]);
}

function buscarParceiro(usuarioId) {
    const sql = `SELECT u.fkParceiro, c.codigo AS codigo FROM usuario u LEFT JOIN codigo c ON u.id = c.fkUsuario WHERE u.id = ?;`;
    return database.executar(sql, [usuarioId]);
}

function vincularParceiro(idUsuario, idParceiro) {
    const sql = `UPDATE usuario SET fkParceiro = ? WHERE id = ?;`;
    return database.executar(sql, [idParceiro, idUsuario]);
}

function gerarCodigo(idUsuario) {
    const sql = `INSERT INTO codigo (codigo, fkUsuario) VALUES (UUID(), ?);`;
    return database.executar(sql, [idUsuario]);
}

module.exports = {
    cadastrar,
    autenticar,
    buscarPorCodigo,
    buscarParceiro,
    vincularParceiro,
    gerarCodigo
};