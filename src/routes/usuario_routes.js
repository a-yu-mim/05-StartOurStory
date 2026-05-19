
let express = require("express");
let router = express.Router();
let usuarioController = require("../controller/usuario_controller.js");

router.post("/cadastrar",          usuarioController.cadastrar);
router.post("/autenticar",         usuarioController.autenticar);
router.get("/parceiro/:usuarioId", usuarioController.buscarParceiro);

module.exports = router;