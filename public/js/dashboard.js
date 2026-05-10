


let convidados = [];
let economias  = [];
let valoresGrafico = [];

let totalConvidado = 0;
let totalEconomia = 0;
let metaEconomia   = 50000;
let maxConvidados  = 300;

let convidadoToRemove = '';
let economiaToRemove  = 0;
let fetchesCompletos = 0;

let listaConvidadosEl = document.getElementById('listaConvidados');
let listaEconomiaEl   = document.getElementById('listaEconomia');
let totalConvidadosEl = document.getElementById('totalConvidados');
let totalMetaEl       = document.getElementById('totalMeta');

let usuarioId = sessionStorage.ID_USUARIO;

function esconderLoading() {
    fetchesCompletos++;
    if (fetchesCompletos >= 5) {
        document.getElementById('loading').style.display = 'none';
    }
}

let dataCasamento = Date.parse('2026-05-31T10:00:00');
let totalSegundos = Math.floor((dataCasamento - Date.now()) / 1000);

if (totalSegundos <= 0) {
   totalSegundos = 0;
}

function atualizarContagem() {
    if (totalSegundos <= 0) {
        document.getElementById('cdDias').innerHTML = '0';
        document.getElementById('cdHoras').innerHTML = '00';
        document.getElementById('cdMin').innerHTML = '00';
        document.getElementById('cdSeg').innerHTML = '00';
    } else {
        let dias = Math.floor(totalSegundos / 86400);
        let horas = Math.floor((totalSegundos % 86400) / 3600);
        let minutos = Math.floor((totalSegundos % 3600) / 60);
        let segundos = totalSegundos % 60;

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
}
setTimeout(atualizarContagem(), 1000);

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
        plugins: { 
            legend: { display: true },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        let valor = valoresGrafico[context.dataIndex];
                        return '+ ' + valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits : 2 });
                    }
                }
            } },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 20 },
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
    totalConvidadosEl.innerHTML = totalConvidado;

    let totalEconomiaFormatado = Number(totalEconomia) || 0;

    totalMetaEl.innerHTML = `R$ ` + totalEconomiaFormatado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits : 2 });
    
    let metaRestante = metaEconomia - totalEconomia;
    if (metaRestante < 0) {
        metaRestante = 0;
    }

    barraGrafico.data.datasets[0].data = [metaRestante, 0];
    barraGrafico.data.datasets[1].data = [0, totalConvidado];
    barraGrafico.update();

    let aviso = document.getElementById('avisoMeta');
    if (totalEconomia >= metaEconomia) {
        aviso.style.display = 'block';
    } else {
        aviso.style.display = 'none';
    }
}

function atualizarGraficoLinha() {
    fetch(`/economia/todos/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
        let soma = 0;
        let porcentagens = [];
        let labels = [];
        valoresGrafico = [];

        for (let i = 0; i < data.length; i++) {
            soma += Number(data[i].valor);
            let porcentagem = Math.floor(soma * 100 / metaEconomia);
            if (porcentagem > 100) {
                porcentagem = 100;
            }
            porcentagens.push(porcentagem);
            valoresGrafico.push(Number(data[i].valor));
            labels.push(`${i + 1}`);
        }

        linhaGrafico.data.labels = labels;
        linhaGrafico.data.datasets[0].data = porcentagens;
        linhaGrafico.update();
    })
    .catch(err => {
        console.error('Erro ao atualizar gráfico de linha:', err);
    })
    .finally(() => {
        esconderLoading();
    });
}

fetch(`/convidado/meus/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let nome = data[i].nome;
            if (nome && nome !== '-') {
                convidados.push(nome);
            }
        }
        renderListas();
    })
    .catch(err => console.error('Erro ao carregar convidados:', err))
    .finally(() => esconderLoading()); 

fetch(`/economia/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let id = data[i].id;
            let valor = Number(data[i].valor);
            if (valor > 0) {
                economias.push({id: id, valor:valor});
            }
        }
        renderListas();
    })
    .catch(err => console.error('Erro ao carregar economias:', err))
    .finally(() => esconderLoading());

fetch(`/convidado/contar/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
        totalConvidado = data.total;
        atualizarKpisGraficos();
    })
    .catch(err => console.error('Erro ao carregar total de convidados:', err))
    .finally(() => esconderLoading());

fetch(`/economia/soma/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
        totalEconomia = Number(data.total) || 0;
        atualizarKpisGraficos();
    })
    .catch(err => console.error('Erro ao carregar total de economia:', err))
    .finally(() => esconderLoading());

atualizarGraficoLinha();

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
            return response.text().then(t => { throw Error(t); });
        }
        convidados.push(nome);
        totalConvidado++;
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
            return response.text().then(t => { throw Error(t); });
        }
        totalEconomia = Number(totalEconomia) + Number(valor);
        input.value = '';

        fetch(`/economia/${sessionStorage.ID_USUARIO}`)
        .then(response => response.json())
        .then(data => {
            economias = [];
            for (let i = 0; i < data.length; i++) {
                let id = data[i].id;
                let valor = Number(data[i].valor);
                if(valor > 0) {
                    economias.push({ id: id, valor: valor});
                }
            }
            renderListas();
            atualizarKpisGraficos();
            atualizarGraficoLinha();
        })
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
                return resposta.text().then(texto => { throw Error(texto); });
            }
            let novaLista = [];
            for (let i = 0; i < convidados.length; i++) {
                if (convidados[i] !== convidadoToRemove) {
                    novaLista.push(convidados[i]);
                }
            }
            convidados = novaLista;
            totalConvidado--;
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

            let valorRemovido = 0;
            for (let i = 0; i < economias.length; i++) {
                if (economias[i].id == economiaToRemove) {
                    valorRemovido = economias[i].valor;
                }
            }

            let novaLista = [];
            for (let i = 0; i < economias.length; i++) {
                if (economias[i].id != economiaToRemove) {
                    novaLista.push(economias[i]);
                }
            }

            economias = novaLista;
            totalEconomia = totalEconomia - valorRemovido;
            renderListas();
            atualizarKpisGraficos();
            atualizarGraficoLinha();
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
                <span>R$ ${Number(economias[i].valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits : 2})}</span>
                <button onclick="economiaToRemove = ${economias[i].id}; removerEconomia();" title="Remover">&times;</button>
            </div>
        `;
    }
    listaEconomiaEl.innerHTML = htmlEconomia;
}