const database = require("../config/database.js");

function buscarCodigoPorUsuario(usuarioId) {
	let sql = `SELECT codigo FROM codigo WHERE fkUsuario = ?;`;
	return database.executar(sql, [usuarioId])

		.then(function (resultado) {
			if (resultado.length > 0) {
				return resultado;
			}

			// "Existe um código pertencente ao parceiro desse usuário?"
			let sqlParceiro = `SELECT codigo FROM codigo WHERE fkUsuario = (SELECT fkParceiro FROM usuario WHERE id = ?);`;
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