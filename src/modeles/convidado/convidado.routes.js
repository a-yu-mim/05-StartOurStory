
const express = require("express");
const router = express.Router();
const convidadoController = require("./convidado.controller");

router.get("/contar", convidadoController.totalConvidado);
router.get("/:usuarioId", convidadoController.listar);
router.post("/", convidadoController.adicionar);
router.delete("/:id", convidadoController.remover);

module.exports = router;
