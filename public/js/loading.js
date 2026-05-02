
function validarSessao() {
    if(!sessionStorage.ID_USUARIO) {
        window.location = "/pages/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/pages/login.html";
}

verificarSessao();

