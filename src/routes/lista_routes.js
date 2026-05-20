
let express = require("express");
let router = express.Router();
let listaController = require("../controller/lista_controller.js");

router.get("/lista/listar", listaController.listar);
router.delete("/lista/:id", listaController.remover);

module.exports = router;
