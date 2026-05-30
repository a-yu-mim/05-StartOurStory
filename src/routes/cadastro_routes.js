
let express = require("express");
let router = express.Router();
let cadastroController = require("../controller/cadastro_controller.js");

router.post("/cadastrar",          cadastroController.cadastrar);
router.post("/autenticar",         cadastroController.autenticar);
router.get("/parceiro/:usuarioId", cadastroController.buscarParceiro);

module.exports = router;