
let express = require("express");
let router = express.Router();
let convidadoController = require("../controller/convidado_controller.js");

router.get("/convidado/contar/:usuarioId", convidadoController.totalConvidado);
router.get("/convidado/meus/:usuarioId",   convidadoController.listarSoMeus);
router.get("/convidado/:usuarioId",        convidadoController.listar);
router.post("/convidado/",                 convidadoController.adicionar);
router.delete("/convidado/:id",            convidadoController.remover);

module.exports = router;
