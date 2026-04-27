
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/controllerUsuario");

router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);

module.exports = router;