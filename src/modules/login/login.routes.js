
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("login.html", { root: "./src/modules/login" });
});

router.post("/login", (req, res) => {
    res.send("Login realizado com sucesso!");
});

module.exports = router;