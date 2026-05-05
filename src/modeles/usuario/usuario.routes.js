
const express = require("express");
const router = express.Router();
const usuarioController = require("./usuario.controller");

router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);
router.get("/parceiro/:usuarioId", usuarioController.buscarParceiro);

module.exports = router;