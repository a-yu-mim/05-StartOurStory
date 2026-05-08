
const express = require("express");
const router = express.Router();
const economiaController = require("./economia.controller");

router.get("/soma/:usuarioId",  economiaController.totalEconomia);
router.get("/todos/:usuarioId", economiaController.listarTodos);
router.get("/:usuarioId",       economiaController.listar);
router.post("/",                economiaController.adicionar);
router.delete("/:usuarioId/:id",economiaController.remover);

module.exports = router;
