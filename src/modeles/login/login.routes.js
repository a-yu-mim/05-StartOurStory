
const express = require("express");
const router = express.Router();
const loginController = require("./login.controller");

router.get("/", loginController.exibirLogin);

module.exports = router;