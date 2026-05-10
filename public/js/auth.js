
function validarSessao() {
    if (!sessionStorage.ID_USUARIO) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "/pages/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "/pages/login.html";
}

validarSessao();