
function verificarSessao() {
    if (!sessionStorage.ID_USUARIO) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "/pages/login.html";
    }
}

verificarSessao();