
let express = require("express");
let router = express.Router();
let codigoController = require("../controller/codigo_controller.js");

router.get("/:usuarioId", codigoController.buscarCodigoPorUsuario);

module.exports = router;