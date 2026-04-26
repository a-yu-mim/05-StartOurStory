
function cadastro() {
    let nome = document.getElementById("input_nome").value;
    let email = document.getElementById("input_email").value;
    let senha = document.getElementById("input_senha").value;

    if (!nome || !email || !senha) {
        mostrarMensagemCadastro("Preencha todos os campos para continuar.", "red", false);
        return;
    }

    fetch("/usuarios/cadastrar", {
        method:"POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Nao foi possivel realizar o cadastro.");
        } else {
            mostrarMensagemCadastro("Cadastro efetuado!", "green", true);
        }
    })
    .catch(erro => {
        mostrarMensagemCadastro("Erro de conexao com o servidor.", "red", false);
        console.error(erro);
    });
}

function mostrarMensagemCadastro(mensagem, cor, abrirPorta) {
    let alerta = document.getElementById("alerta");
    let mensagemElemento = document.getElementById("mensagem");
    let porta = document.getElementById("porta");
    let somPorta = document.getElementById("somPorta");

    if (alerta && mensagemElemento) {
        mensagemElemento.innerHTML = mensagem;
        alerta.style.background = cor;
        alerta.style.display = "block";
    }

    if (abrirPorta && porta && somPorta) {
        porta.style.display = "block";
        somPorta.play();
    }
}

  function irParaLogin(){
    window.location.href = "login.html";
  }

  function fecharAlerta(){
    const alerta = document.getElementById("alerta");
    alerta.style.display = "none";
  }