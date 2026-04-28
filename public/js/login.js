
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
        let btnEntrar = document.getElementById("btn-entrar");

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
            alavanca.style.left = "32px";
            botao.style.background = "#4d4d4d";
            alavanca.style.background = "black";
            fundo.style.background = "#000000";
            card.style.background = "#000000";
            card.style.border = "2px solid #4d4d4d";
            card.style.color = "#ffffff";
            h2.style.color = "#4d4d4d";
            p.style.color = "#4d4d4d";
            link.style.color = "#4d4d4d";
            btnEntrar.style.color = "#616161";
            btnEntrar.style.background = "#111111";
            btnEntrar.style.border = "2px solid #4d4d4d";
            email.style.background = "#000000";
            email.style.color = "white";
            email.style.border = "2px solid #4d4d4d";
            senha.style.background = "#000000";
            senha.style.color = "white";
            senha.style.border = "2px solid #4d4d4d";
        }
    }
