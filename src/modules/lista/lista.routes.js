let express = require("express");
let router = express.Router();
let listaController = require("./lista.controller");

router.get("/", listaController.listar);
router.delete("/:id", listaController.remover);

module.exports = router;
