
function esconderLoading() {
    let loadingEl = document.getElementById('loading');

    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

let listaConvidadosEl = document.getElementById('listaConvidados');
let btnImprimir = document.getElementById('btnImprimir');

let convidados = [];

function dashboard() {
    window.location.href = "/pages/dashboard.html";
}

function login() {
    window.location.href = "/pages/login.html";
}

function cadastro() {
    window.location.href = "/pages/cadastro.html";
}

function logout() {
    window.location.href = "/pages/home.html";
}


function renderLista() {
    listaConvidadosEl.innerHTML = '';

    let html = '';

    for (let i = 0; i < convidados.length; i++) {
        html += `
            <div class="item">
                <span class="texto">${convidados[i]}</span>
                <button class="btn2" onclick="removerConvidado('${convidados[i]}')">
                &times;
                </button>
            </div>`;
    }
    listaConvidadosEl.innerHTML = html;
}

function carregarConvidados() {
    fetch('/lista/listar')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            convidados = [];
            for (let i = 0; i < data.length; i++) {
                let nome = data[i].nome;
                if (nome && nome != '-') {
                    convidados.push(nome);
                }
            }
            renderLista();
            esconderLoading();
        })
        .catch(function (erro) {
            console.error('Erro ao carregar convidados:', erro);
            esconderLoading();
        });
}

function removerConvidado(nome) {
    let ok = confirm('Tem certeza?');
    if (!ok) {
        return;
    }

    fetch('/lista/' + nome, {
        method: 'DELETE'
    })
        .then(function () {
            let novo = [];
            for (let i = 0; i < convidados.length; i++) {
                if (convidados[i] != nome) {
                    novo.push(convidados[i]);
                }
            }
            convidados = novo;
            renderLista();
        });
}

btnImprimir.addEventListener('click', function () {
    window.print();
});

carregarConvidados();
