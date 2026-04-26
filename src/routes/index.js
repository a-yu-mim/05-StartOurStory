var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/index.html"));
});

router.get("/index.html", function (req, res) {
    res.redirect("/pages/index.html");
});

router.get("/login.html", function (req, res) {
    res.redirect("/pages/login.html");
});

router.get("/cadastro.html", function (req, res) {
    res.redirect("/pages/cadastro.html");
});

router.get("/dashboard.html", function (req, res) {
    res.redirect("/pages/dashboard.html");
});

module.exports = router;