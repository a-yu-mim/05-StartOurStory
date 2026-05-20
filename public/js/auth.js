
const paginasPublicas = ["index.html", "login.html", "cadastro.html", ""];
const paginaAtual = window.location.pathname.split("/").pop();

function validarSessao() {
    if (paginasPublicas.includes(paginaAtual)) {
        return;
    }

    const usuarioLogado = localStorage.getItem("usuario") || sessionStorage.ID_USUARIO;

    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "/pages/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    localStorage.removeItem("usuario");
    window.location.href = "/pages/login.html";
}

validarSessao();