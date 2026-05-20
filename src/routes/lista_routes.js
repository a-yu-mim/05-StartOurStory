
let express = require("express");
let router = express.Router();
let listaController = require("../controller/lista_controller.js");

router.get("/listar", listaController.listar);
router.delete("/:id", listaController.remover);

module.exports = router;
