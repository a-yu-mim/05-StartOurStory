
const path = require("path");

function exibirLogin(req, res) {
    res.sendFile(path.join(__dirname, "../../public/pages/login.html"));
}

module.exports = { exibirLogin };