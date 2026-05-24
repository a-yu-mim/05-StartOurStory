
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

            setTimeout(irParaLogin, 3500);

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