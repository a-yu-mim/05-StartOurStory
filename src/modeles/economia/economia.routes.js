
const express = require("express");
const router = express.Router();
const economiaController = require("./economia.controller");

router.get("/soma/:usuarioId", economiaController.totalEconomia);
router.get("/:usuarioId", economiaController.listar);
router.post("/", economiaController.adicionar);
router.delete("/:id", economiaController.remover);

module.exports = router;
