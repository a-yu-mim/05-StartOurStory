// ===========================================
// |   Verificar se o usuário está logado    |
// ===========================================
function validarSessao() {

    // Pega os dados salvos no login
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;

    if (email == null && nome == null) {
        window.location = "login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}

// ===========================================
// |     Mostrar a tela de carregamento      |
// ===========================================
function aguardar() {
    let divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

// ===========================================
// |     Esconder a tela de carregamento     |
// ===========================================
function finalizarAguardar() {
    let divAguardar = document.getElementById("div_aguardar");
    let divErrosLogin = document.getElementById("div_erros_login");
    
    divAguardar.style.display = "none";
    divErrosLogin.style.display = "flex";
    divErrosLogin.innerHTML = 'Erro ao fazer login';
}


