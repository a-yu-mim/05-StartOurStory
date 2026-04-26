
function login() {
    let email = document.getElementById("input_email").value;
    let senha = document.getElementById("input_senha").value;

    if (email === "" || senha === "") {
        alert("Preencha todos os campos para continuar.");
        return;
    }

// ===========================================
// |        Enviar dados ao servidor         |
// ===========================================
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

// ====================================================
// |   "Quando o servidor terminar de responder..."   |
// ====================================================
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Email ou senha invalidos.");
        }
    })

// ==============================================
// |   "Quando os dados já tiverem pronto..."   |
// ==============================================
    .then(dadosUsuario => {
        sessionStorage.ID_USUARIO = dadosUsuario.id;
        sessionStorage.EMAIL_USUARIO = dadosUsuario.email;
        sessionStorage.NOME_USUARIO = dadosUsuario.nome;

        alert("Login efetuado!");
        window.location.href = "index.html";
    })

// ===========================================
// |         Erro ao fazer login             |
// ===========================================
    .catch(erro => {
        alert(erro.message);
    });
}
