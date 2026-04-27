
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/controllerLogin");

router.get("/", loginController.exibirLogin);

module.exports = router;