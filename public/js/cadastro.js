
function esconderLoading() {
    let loadingEl = document.getElementById('loading');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

function irParaLogin(){
    window.location.href = "login.html";
}

function cadastro() {
    let nomeEl = document.getElementById("input_nome").value;
    let emailEl = document.getElementById("input_email").value;
    let senhaEl = document.getElementById("input_senha").value;
    let codigoEl = document.getElementById("input_codigo").value;

    if (!nomeEl || !emailEl || !senhaEl) {
        mostrarAlerta("Preencha todos os campos.", "red");
        return;
    }

    fetch("/usuarios/cadastrar", {
        method:"POST", 
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({
            nome:   nomeEl,
            email:  emailEl,
            senha:  senhaEl,
            codigo: codigoEl
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { 
                mostrarAlerta(data.message || "Erro ao cadastrar.", "red");       
            });
        } else {
            mostrarAlerta("Cadastro efetuado!", "green", true);
            setTimeout(() => { window.location.href = "login.html"; }, 1200);
        }
    })
    .catch(erro => {
        mostrarAlerta("Erro de conexão com o servidor.", "red");
    });
}

function mostrarAlerta(mensagem, cor, abrirPorta = false) {
    let alertaEl = document.getElementById("alerta");
    let mensagemEl = document.getElementById("mensagem");
    let portaEl    = document.getElementById("porta");
    let somPortaEl = document.getElementById("somPorta");

    if (!alertaEl || !mensagemEl) {
        return;
    } 

    mensagemEl.innerHTML = mensagem;
    alertaEl.style.background = cor;
    alertaEl.style.display = "block";
    
    if (abrirPorta && portaEl && somPortaEl) {
        portaEl.style.display = "block";
        somPortaEl.play();
    }
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

esconderLoading();