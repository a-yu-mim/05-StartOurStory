// ------------------------------------------------
//    Esse arquivo diz o que fazer quando alguém 
//     clica em algo relacionado a "usuarios"
// ------------------------------------------------

const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/autenticar", usuarioController.autenticar);

module.exports = router;