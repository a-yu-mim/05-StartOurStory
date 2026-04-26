
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
        window.location.href = "dashboard.html";
    })
    .catch(erro => {
        alert(erro.message);
    });
}

function darkModo() {
        let fundo = document.getElementById("body");
        let botao = document.getElementById("botao");
        let alavanca = document.getElementById("alavanca");
        let card = document.getElementById("card");
        let email = document.getElementById("input_email");
        let senha = document.getElementById("input_senha");
        let btnEntrar = document.getElementById("btn-entrar");
        let link = document.getElementById("link");

        if (alavanca.style.left == "32px") {
            fundo.style = "";
            botao.style = "";
            alavanca.style.left = "";
            card.style = "";
            btnEntrar.style = "";
            email.style = "";
            senha.style = "";
            link.style = "";
        } else {
            fundo.style.background = "#121212";
            fundo.style.color = "#f1f1f1";
            botao.style.background = "#4caf50";
            botao.style.outline = "2px solid #4caf50";
            alavanca.style.left = "32px";
            card.style.background = "#1e1e1e";
            card.style.border = "2px solid #333";
            card.style.color = "#ffffff";
            btnEntrar.style.background = "black";
            email.style.background = "#252525";
            email.style.color = "white";
            email.style.border = "2px solid #333";
            senha.style.background = "#252525";
            senha.style.color = "white";
            senha.style.border = "2px solid #333";
            link.style.color = "white";
        }
    }
