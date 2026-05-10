
function esconderLoading() {
    let loadingEl = document.getElementById('loading');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

function login() {
    let emailEl = document.getElementById("input_email").value;
    let senhaEl = document.getElementById("input_senha").value;

    if (!emailEl || !senhaEl) {
        mostrarAlerta("Preencha todos os campos.", "red", false);
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailEl,
            senha: senhaEl
        })
    })
    .then(response => {
        if (!response.ok) {
            mostrarAlerta("Email ou senha inválidos.", "red");
            return null;
        } else {
            return response.json();
        }
    })
    .then(dadosUsuario => {
        if (!dadosUsuario) {
            return;
        }

        sessionStorage.setItem("ID_USUARIO", dadosUsuario.id);
        sessionStorage.setItem("EMAIL_USUARIO", dadosUsuario.email);
        sessionStorage.setItem("NOME_USUARIO", dadosUsuario.nome);
        window.location.href = "/pages/dashboard.html";
    })
    .catch(erro => {
        mostrarAlerta("Não foi possível conectar ao servidor.", "red");
    });
}

function mostrarAlerta(mensagem, cor) {
    let alertaEl = document.getElementById("alerta");
    let mensagemEl = document.getElementById("mensagem");

    if (!alertaEl || !mensagemEl) {
        return;
    }

    mensagemEl.innerHTML = mensagem;
    alertaEl.style.background = cor;
    alertaEl.style.display = "block";
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

esconderLoading();
