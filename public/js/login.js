
function irParaHome() {
    window.location.href = "/pages/home.html";
}

function login() {
    let input_email = document.getElementById("input_email").value;
    let input_senha = document.getElementById("input_senha").value;

    if (!input_email && !input_senha) {
        return mostrarAlerta("Preencha todos os campos!", "red");
    }

    if (!input_email) {
        return mostrarAlerta("Informe o e-mail.", "red");
    }

    if (!input_senha) {
        return mostrarAlerta("Informe a senha.", "red");
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: input_email,
            senha: input_senha
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            return resposta.json();
        } else {
            mostrarAlerta("E-mail ou senha incorreta.", "red");
            return null;
        }
    })
    .then(function (dadosUsuario){
        if (!dadosUsuario) return;

        document.getElementById("input_email").value = "";
        document.getElementById("input_senha").value = "";

        sessionStorage.setItem("ID_USUARIO",    dadosUsuario.id);
        sessionStorage.setItem("EMAIL_USUARIO", dadosUsuario.email);
        sessionStorage.setItem("NOME_USUARIO",  dadosUsuario.nome);
        mostrarAlerta("Login realizado com sucesso!", "green");
        abrirPorta();
    })
    .catch(function (erro) {
        mostrarAlerta("Erro desconhecido.", "black");
    });
}

function abrirPorta() {
    let imagem = document.querySelector(".porta img");
    let alavanca = document.getElementById("alavanca");

    if(alavanca.style.left == "32px"){
        imagem.src = "../assets/porta_aberta_dark.png";
        imagem.style.cursor = "pointer";
        imagem.onclick = irParaHome;
        return;
    } else {
        imagem.src = "../assets/porta_aberta.png";
        imagem.style.cursor = "pointer";
        imagem.onclick = irParaHome;
        return;
    }
}

function mostrarAlerta(mensagem, cor) {
    let alerta   = document.getElementById("alerta");
    let mensagemEl = document.getElementById("mensagem");

    mensagemEl.innerHTML = mensagem;
    alerta.style.background = cor;
    alerta.style.display = "block";
}
    
function fecharAlerta() {
    let alertaEl = document.getElementById("alerta");

    if (alertaEl) {
        alertaEl.style.display = "none";
    }
}

function verSenha() {
    let input = document.getElementById("input_senha");
    let icone = document.getElementById("iconeSenha");

    if (input.type == "password") {
        input.type = "text";
        icone.src = "../assets/olho-aberto.png";
    } else {
        input.type = "password";
        icone.src = "../assets/olho-fechado.png";
    }
}