
let express = require("express");
let router = express.Router();
let economiaController = require("../controller/economia_controller.js");

router.get("/economia/soma/:usuarioId",  economiaController.totalEconomia);
router.get("/economia/todos/:usuarioId", economiaController.listarTodos);
router.get("/economia/:usuarioId",       economiaController.listar);
router.post("/economia/",                economiaController.adicionar);
router.delete("/economia/:usuarioId/:id",economiaController.remover);

module.exports = router;
