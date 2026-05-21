
function esconderLoading() {
    let loading = document.getElementById('loading');
    
    if (loading) {
        loading.style.display = 'none';
    }
}

function irParaLogin(){
    window.location.href = "login.html";
}

function cadastro() {
    let input_nome = document.getElementById("input_nome").value;
    let input_email = document.getElementById("input_email").value;
    let input_senha = document.getElementById("input_senha").value;
    let input_codigo = document.getElementById("input_codigo").value;

    if (!input_nome && !input_email && !input_senha) {
        return mostrarAlerta("Preencha todos os campos!", "red");
    }

    if (!input_nome) {
        return mostrarAlerta("Inclua um nome.", "red");
    }

    if (!input_email) {
        return mostrarAlerta("Inclua um e-mail.", "red");
    }

    if (!input_email.includes("@")) {
        return mostrarAlerta(`Inclua um "@" no endereço de e-mail.`, "red");
    }

    if (!input_email.includes(".")) {
        return mostrarAlerta(`Inclua um "." no endereço de e-mail.`, "red");
    }

    if (!input_senha){
        return mostrarAlerta("Inclua uma senha", "red");
    }
    
    fetch("/usuarios/cadastrar", {
        method:"POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
            nome:   input_nome,
            email:  input_email,
            senha:  input_senha,
            codigo: input_codigo
        })
    })
    .then(function (resposta) {
        if (resposta.ok) {
            mostrarAlerta("Cadastro realizado com sucesso! Redirecionando para login...", "green");

            setTimeout(irParaLogin, 3000);

        } else {
            resposta.text().then(function (mensagem) {
            mostrarAlerta(mensagem, "red");       
            });
        }
    })
    .catch(function (erro) {
        mostrarAlerta("Não foi possivel concluir a operação.", "black");
    });
}

function mostrarAlerta(mensagem, cor) {
    let alertaEl = document.getElementById("alerta");
    let mensagemEl = document.getElementById("mensagem");
    
    mensagemEl.innerHTML = mensagem;
    alertaEl.style.background = cor;
    alertaEl.style.display = "block";
}

function fecharAlerta(){
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
    let nome = document.getElementById("input_nome");
    let email = document.getElementById("input_email");
    let senha = document.getElementById("input_senha");
    let codigo = document.getElementById("input_codigo");
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
        nome.style = "";
        email.style = "";
        senha.style = "";
        codigo.style = "";
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
        nome.style.background = "#141414";
        nome.style.color = "#ffffff";
        nome.style.border = "2px solid #2f2f2f";    
        email.style.background = "#141414";
        email.style.color = "#ffffff";
        email.style.border = "2px solid #2f2f2f";
        senha.style.background = "#141414";
        senha.style.color = "#ffffff";
        senha.style.border = "2px solid #2f2f2f";
        codigo.style.background = "#141414";
        codigo.style.color = "#ffffff";
        codigo.style.border = "2px solid #2f2f2f";
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

esconderLoading();