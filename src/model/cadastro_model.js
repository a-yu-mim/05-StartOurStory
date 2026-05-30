
let database = require("../config/database.js")

function cadastrar(nome, email, senha, fkParceiro) {
    let sql = `INSERT INTO usuario (nome, email, senha, fkParceiro) VALUES (?, ?, ?, ?);`;
    return database.executar(sql, [nome, email, senha, fkParceiro]);
}

function autenticar(email, senha) {
    let sql = `SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?;`;
    return database.executar(sql, [email, senha]);
}

function buscarPorCodigo(codigo) {
    let sql = `SELECT u.id, u.fkParceiro FROM codigo c JOIN usuario u ON c.fkUsuario = u.id WHERE c.codigo = ?;`;
    return database.executar(sql, [codigo]);
}

function buscarParceiro(usuarioId) {
    let sql = `SELECT u.fkParceiro, c.codigo AS codigo FROM usuario u LEFT JOIN codigo c ON u.id = c.fkUsuario WHERE u.id = ?;`;
    return database.executar(sql, [usuarioId]);
}

function vincularParceiro(idUsuario, idParceiro) {
    let sql = `UPDATE usuario SET fkParceiro = ? WHERE id = ?;`;
    return database.executar(sql, [idParceiro, idUsuario]);
}

function gerarCodigo(idUsuario, codigo) {
    let sql = `INSERT INTO codigo (fkUsuario, codigo) VALUES (?, ?);`;
    return database.executar(sql, [idUsuario, codigo]);
}

function buscarPorId(usuarioId) {
    let sql = `SELECT id, nome, email, fkParceiro FROM usuario WHERE id = ?;`;
    return database.executar(sql, [usuarioId]);
}

module.exports = {
    cadastrar,
    autenticar,
    buscarPorCodigo,
    buscarParceiro,
    vincularParceiro,
    gerarCodigo,
    buscarPorId
};