
let express = require("express");
let router = express.Router();
let usuarioController = require("../controller/usuario_controller.js");

router.post("/usuario/cadastrar",          usuarioController.cadastrar);
router.post("/usuario/autenticar",         usuarioController.autenticar);
router.get("/usuario/parceiro/:usuarioId", usuarioController.buscarParceiro);

module.exports = router;