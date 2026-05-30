const database = require("../config/database.js");

function buscarCodigoPorUsuario(usuarioId) {
	let sql = `SELECT codigo FROM codigo WHERE fkUsuario = ?;`;
	return database.executar(sql, [usuarioId])
		.then(function (lista) {
			if (lista.length > 0) {
				return lista;
			}

			let sqlParceiro = `
				SELECT c.codigo
				FROM codigo c
				JOIN usuario u ON c.fkUsuario = u.fkParceiro
				WHERE u.id = ?;
			`;
			return database.executar(sqlParceiro, [usuarioId]);
		});
}

function marcarHorarioUso(codigo) {
	let sql = `UPDATE codigo SET horarioUso = CURRENT_TIMESTAMP WHERE codigo = ?;`;
	return database.executar(sql, [codigo]);
}

module.exports = {
	buscarCodigoPorUsuario,
	marcarHorarioUso
};