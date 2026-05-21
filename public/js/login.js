
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

        mostrarPorta();

        sessionStorage.setItem("ID_USUARIO",    dadosUsuario.id);
        sessionStorage.setItem("EMAIL_USUARIO", dadosUsuario.email);
        sessionStorage.setItem("NOME_USUARIO",  dadosUsuario.nome);
        
    })
    .catch(function (erro) {
        mostrarAlerta("Não foi possivel concluir a operação.", "black");
    });
}

function mostrarPorta() {
    let porta = document.getElementById("porta");
    let somPorta = document.getElementById("somPorta");

    if (porta) {
        porta.style.display = "block";
    }

    if (somPorta) {
        somPorta.play();
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
    
function darkModo() {
    let fundo = document.getElementById("body");
    let botao = document.getElementById("botao");
    let alavanca = document.getElementById("alavanca");
    let card = document.querySelector(".card");
    let h2 = document.querySelector(".card h2");
    let p = document.querySelector(".card p");
    let link = document.getElementById("link");
    let email = document.getElementById("input_email");
    let senha = document.getElementById("input_senha");
    let btnEntrar = document.getElementById("btnEntrar");

    if (alavanca.style.left == "32px") {
        botao.style = "";
        alavanca.style = "";
        fundo.style = "";
        card.style = "";
        h2.style = "";
        p.style = "";
        link.style = "";
        btnEntrar.style = "";
        email.style = "";
        senha.style = "";
      } else {
        botao.style.background = "#ccc";
        alavanca.style.left = "32px";
        alavanca.style.background = "#0c0c0c";
        alavanca.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
        fundo.style.background = "#323232";
        card.style.background = "#141414";
        card.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
        card.style.border = "2px solid #2a2a2a";
        card.style.color = "#f5f5f5";
        card.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
        h2.style.color = "#ffffff";
        p.style.color = "#838383";
        link.style.color = "#838383";
        btnEntrar.style.color = "#ffffff";
        btnEntrar.style.background = "#0a0a0a";
        email.style.background = "#141414";
        email.style.color = "#ffffff";
        email.style.border = "2px solid #2f2f2f";
        senha.style.background = "#141414";
        senha.style.color = "#ffffff";
        senha.style.border = "2px solid #2f2f2f";
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