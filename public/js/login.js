
function login() {
    let email = document.getElementById("input_email").value;
    let senha = document.getElementById("input_senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos para continuar.");
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Email ou senha inválidos.");
        } else {
            return response.json();
        }
    })
    .then(dadosUsuario => {
        sessionStorage.ID_USUARIO = dadosUsuario.id;
        sessionStorage.EMAIL_USUARIO = dadosUsuario.email;
        sessionStorage.NOME_USUARIO = dadosUsuario.nome;

        alert("Login efetuado!");
        window.location.href = "/pages/dashboard.html";
    })
    .catch(erro => {
        alert(erro.message);
    });
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
        link.style.color = "#ffffff";
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
