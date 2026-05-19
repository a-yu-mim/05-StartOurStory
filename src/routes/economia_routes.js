
let express = require("express");
let router = express.Router();
let economiaController = require("../controller/economia_controller.js");

router.get("/soma/:usuarioId",  economiaController.totalEconomia);
router.get("/todos/:usuarioId", economiaController.listarTodos);
router.get("/:usuarioId",       economiaController.listar);
router.post("/",                economiaController.adicionar);
router.delete("/:usuarioId/:id",economiaController.remover);

module.exports = router;
