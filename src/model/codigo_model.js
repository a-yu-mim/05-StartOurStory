
const database = require("../config/database.js");

function buscarCodigoPorUsuario(usuarioId) {
	let sql = `SELECT codigo FROM codigo WHERE fkUsuario = ?;`;
	return database.executar(sql, [usuarioId]);
}

module.exports = {
	buscarCodigoPorUsuario
};