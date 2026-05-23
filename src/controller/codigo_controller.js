
const codigoModel = require("../model/codigo_model.js");

function buscarCodigoPorUsuario(req, res) {
	let usuarioId = req.params.usuarioId;

	if (!usuarioId) {
		return res.status(400).send("Usuário não informado");
	}

	codigoModel.buscarCodigoPorUsuario(usuarioId)
		.then(function (lista) {
			if (lista.length == 0) {
				return res.status(404).send("Código não encontrado.");
			}
			res.json(lista[0]);
		})
		.catch(function (erro) {
			res.status(500).json({ erro: erro.message });
		});
}

module.exports = {
	buscarCodigoPorUsuario
};

