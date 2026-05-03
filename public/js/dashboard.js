
let convidados = [];
let economias  = [];

let totalConvidadosGlobal = 0;
let totalEconomiaGlobal = 0;

let metaEconomia   = 50000;
let maxConvidados  = 300;

let convidadoToRemove = '';
let economiaToRemove  = 0;

let listaConvidadosEl = document.getElementById('listaConvidados');
let listaEconomiaEl   = document.getElementById('listaEconomia');
let totalConvidadosEl = document.getElementById('totalConvidados');
let totalMetaEl       = document.getElementById('totalMeta');

let fetchesCompletos = 0;

function esconderLoading() {
    fetchesCompletos++;
    if (fetchesCompletos >= 5) {
        document.getElementById('loading').style.display = 'none';
    }
}

if (sessionStorage.NOME_USUARIO) {
    alert(`Bem-vindo, ${sessionStorage.NOME_USUARIO}!`);
}

fetch(`/convidado/${sessionStorage.ID_USUARIO}`)
    .then(response => response.json())
    .then(data => {
        let nomesValidos = [];

        for (let i = 0; i < data.length; i++) {
            let nome = '';

            if (typeof data[i] === 'object' && data[i] !== null) {
                nome = data[i].nome;
            } else {
                nome = data[i];
            }

            if (nome && nome !== '-' && nome !== null) {
                nomesValidos.push(nome);
            }
        }
        convidados = nomesValidos;
        renderListas();
    })
    .catch(err => {
        console.error('Erro ao carregar convidados:', err);
    })
    .finally(() => {
        esconderLoading();
    });

fetch(`/economia/${sessionStorage.ID_USUARIO}`)
    .then(response => response.json())
    .then(data => {
        let listaEconomiasAtivas = [];

        for (let i = 0; i < data.length; i++) {
            let valor = parseInt(data[i].valor);
            if (valor > 0) {
                listaEconomiasAtivas.push(valor);
            }
        }
            
        for (let i = 0; i < data.length; i++) {
            let valor = parseInt(data[i].valor);
            if (valor < 0) {
                let index = listaEconomiasAtivas.indexOf(Math.abs(valor));
                if (index !== -1) {
                    listaEconomiasAtivas.splice(index, 1);
                }
            }
        }
        economias = listaEconomiasAtivas;
        renderListas();
    })
    .catch(err => {
        console.error('Erro ao carregar economias:', err);
    })
    .finally(() => {
        esconderLoading();
    });

fetch('/convidado/contar')
    .then(response => response.json())
    .then(data => {
        totalConvidadosGlobal = data.total;
        atualizarKpisGraficos();
    })
    .catch(err => {
        console.error('Erro ao carregar total de convidados:', err);
    })
    .finally(() => {
        esconderLoading();
    });

fetch('/economia/soma')
    .then(response => response.json())
    .then(data => {
        totalEconomiaGlobal = data.total || 0;
        atualizarKpisGraficos();
    })
    .catch(err => {
        console.error('Erro ao carregar total de economia:', err);
    })
    .finally(() => {
        esconderLoading();
    });

fetch('/economia/todos')
    .then(response => response.json())
    .then(data => {
        let soma = 0;
        let porcentagens = [];
        let labels = [];

        for (let i = 0; i < data.length; i++) {
            soma += Number(data[i].valor);
            let porcentagem = Math.floor(soma * 100 / metaEconomia);
            if (porcentagem > 100) {
                porcentagem = 100;
            }
            porcentagens.push(porcentagem);
            labels.push(`Depósito ${i + 1}`);
        }
        linhaGrafico.data.labels = labels;
        linhaGrafico.data.datasets[0].data = porcentagens;
        linhaGrafico.update();
    })
    .catch(err => {
        console.error('Erro ao carregar economias:', err);
    })
    .finally(() => {
        esconderLoading();
    });

let dataCasamento = Date.parse('2026-05-02T16:59:00');
let totalSegundos = Math.floor((dataCasamento - Date.now()) / 1000);

if (totalSegundos <= 0) {
   totalSegundos = 0;
}

function atualizarContagem() {

    let dias = Math.floor(totalSegundos / (3600 * 24));
    let resto = totalSegundos % (3600 * 24);
    let horas = Math.floor(resto / 3600);
    resto = resto % 3600;
    let minutos = Math.floor(resto / 60);
    let segundos = resto % 60;

if (horas < 10) {
    horas = '0' + horas;
}  
if (minutos < 10) { 
    minutos = '0' + minutos;
}
if (segundos < 10) {
    segundos = '0' + segundos;
}
    document.getElementById('cdDias').innerHTML = dias;
    document.getElementById('cdHoras').innerHTML = horas;
    document.getElementById('cdMin').innerHTML = minutos;
    document.getElementById('cdSeg').innerHTML = segundos;

    totalSegundos--;
}

atualizarContagem()
setInterval(atualizarContagem, 1000);

let linhaGrafico = new Chart(document.getElementById('linhaGrafico'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Progresso para a Meta (%)',
            data: [],
            borderColor: '#f48fb1',
            backgroundColor: 'rgba(244, 143, 177, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: '%' }
            }
        }
    }
});

let barraGrafico = new Chart(document.getElementById('barraGrafico'), {
    type: 'bar',
    data: {
        labels: ['Meta Restante', 'Convidados'],
        datasets: [
            {
                label: 'Meta Restante',
                data: [metaEconomia, 0],
                backgroundColor: '#f48fb1',
                yAxisID: 'yEcon'
            },
            {
                label: 'Convidados',
                data: [0, 0],
                backgroundColor: '#a8d8ea',
                yAxisID: 'yConv'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
            yEcon: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                max: metaEconomia,
                title: { display: true, text: 'R$' }
            },
            yConv: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                max: maxConvidados,
                title: { display: true, text: 'Convidados' },
                grid: { drawOnChartArea: false }
            }
        }
    }
});

function atualizarKpisGraficos() {
    totalConvidadosEl.innerHTML = totalConvidadosGlobal;
    totalMetaEl.innerHTML = `R$ ` + totalEconomiaGlobal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    let metaRestante = metaEconomia - totalEconomiaGlobal;
    if (metaRestante < 0) {
        metaRestante = 0;
    }

    barraGrafico.data.datasets[0].data = [metaRestante, 0];
    barraGrafico.data.datasets[1].data = [0, totalConvidadosGlobal];
    barraGrafico.update();

    let porcentagens = parseInt((totalEconomiaGlobal * 100) / metaEconomia);
    if (porcentagens > 100) {
        porcentagens = 100;
    }
    
    linhaGrafico.data.labels = ['Total'];
    linhaGrafico.data.datasets[0].data = [porcentagens];
    linhaGrafico.update();

    let aviso = document.getElementById('avisoMeta');
    if (totalEconomiaGlobal >= metaEconomia) {
        aviso.style.display = 'block';
    } else {
        aviso.style.display = 'none';
    }
}

function addConvidado() {
    let input = document.getElementById('input_convidado');
    let nome  = input.value;

    if (nome == '') {
        alert('Por favor, insira o nome do convidado.');
        return;
    }

    for (let i = 0; i < convidados.length; i++) {
        if (convidados[i] == nome) {
            alert('Este convidado já foi adicionado!');
            return;
        }
    }

    fetch('/convidado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome,
            usuarioId: sessionStorage.ID_USUARIO
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        convidados.push(nome);
        totalConvidadosGlobal++;
        input.value = '';
        renderListas();
        atualizarKpisGraficos();
    })
    .catch(err => {
        alert('Erro ao adicionar convidado: ' + err.message);
    });
}

function addEconomia() {
    let input = document.getElementById('input_economia');
    let valor = input.value;

    if (valor == '' || valor <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    fetch('/economia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            valor: valor,
            usuarioId: sessionStorage.ID_USUARIO
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        economias.push(Number(valor));
        totalEconomiaGlobal = Number(totalEconomiaGlobal) + Number(valor);
        input.value = '';
        renderListas();
        atualizarKpisGraficos();
    })
    .catch(err => {
        alert('Erro ao adicionar economia: ' + err.message);
    });
}

function removerConvidado() {
    if (confirm('Tem certeza que deseja remover este convidado?')) {
        fetch(`/convidado/${encodeURIComponent(convidadoToRemove)}`, {
            method: 'DELETE'
        })
        .then(resposta => {
            if (!resposta.ok) {
                return resposta.text().then(texto => { throw new Error(texto); });
            }
            let novaLista = [];
            for (let i = 0; i < convidados.length; i++) {
                if (convidados[i] !== convidadoToRemove) {
                    novaLista.push(convidados[i]);
                }
            }
            convidados = novaLista;
            totalConvidadosGlobal--;
            renderListas();
            atualizarKpisGraficos();
        })
        .catch(erro => {
            alert('Erro ao remover convidado: ' + erro.message);
        });
    }
}

function removerEconomia() {
    if (confirm('Tem certeza que deseja remover este valor?')) {
        fetch('/economia/' + sessionStorage.ID_USUARIO + '/' + economiaToRemove, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (!response.ok) {
                alert('Erro ao remover economia');
                return;
            }
            let novaLista = [];
            for (let i = 0; i < economias.length; i++) {
                if (economias[i] != economiaToRemove) {
                    novaLista.push(economias[i]);
                }
            }
            economias = novaLista;
            totalEconomiaGlobal = totalEconomiaGlobal - Number(economiaToRemove);
            renderListas();
            atualizarKpisGraficos();
        })
        .catch(err => {
            alert('Erro ao remover economia: ' + err.message);
        });
    }
}

function renderListas() {
    let htmlConvidados = '';
    for (let i = 0; i < convidados.length; i++) {
        htmlConvidados += `
            <div class="item">
                <span>${convidados[i]}</span>
                <button onclick="convidadoToRemove = '${convidados[i]}'; removerConvidado();" title="Remover">&times;</button>
            </div>
        `;
    }
    listaConvidadosEl.innerHTML = htmlConvidados;

    let htmlEconomia = '';
    for (let i = 0; i < economias.length; i++) {
        htmlEconomia += `
            <div class="item">
                <span>R$ ${Number(economias[i]).toLocaleString('pt-BR', { minimumFractionDigits: 2})}</span>
                <button onclick="economiaToRemove = ${economias[i]}; removerEconomia();" title="Remover">&times;</button>
            </div>
        `;
    }
    listaEconomiaEl.innerHTML = htmlEconomia;
}