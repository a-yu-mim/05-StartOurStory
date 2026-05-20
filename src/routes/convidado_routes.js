
let express = require("express");
let router = express.Router();
let convidadoController = require("../controller/convidado_controller.js");

router.get("/contar/:usuarioId", convidadoController.totalConvidado);
router.get("/meus/:usuarioId",   convidadoController.listarSoMeus);
router.get("/:usuarioId",        convidadoController.listar);
router.post("/",                 convidadoController.adicionar);
router.delete("/:id",            convidadoController.remover);

module.exports = router;
