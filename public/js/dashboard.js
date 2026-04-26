
let convidados = [];
    let economias  = [];

    let metaEconomia   = 50000;
    let maxConvidados  = 300;

    let convidadoToRemove = '';
    let economiaToRemove  = 0;

    let listaConvidadosEl = document.getElementById('listaConvidados');
    let listaEconomiaEl   = document.getElementById('listaEconomia');
    let totalConvidadosEl = document.getElementById('totalConvidados');
    let totalMetaEl       = document.getElementById('totalMeta');

    // -----------------------------------------------
    // CONTAGEM REGRESSIVA
    // Data atual:  24/04/2026
    // Data do casamento: 20/05/2026 às 10h
    // Diferença: 26 dias e 10 horas = 2.282.400 segundos
    // -----------------------------------------------
    let totalSegundos = 2282400;

    function atualizarContagem() {

        if (totalSegundos <= 0) {
            document.getElementById('countdown').innerHTML = 'Chegou o dia!';
            return;
        }

        let resto = totalSegundos;

        let dias = (resto - (resto % 86400)) / 86400;
        resto = resto % 86400;

        let horas = (resto - (resto % 3600)) / 3600;
        resto = resto % 3600;

        let minutos = (resto - (resto % 60)) / 60;
        let seg = resto % 60;

        let horasTexto   = '' + horas;
        let minutosTexto = '' + minutos;
        let segTexto     = '' + seg;

        if (horas < 10) {
            horasTexto = '0' + horas;
        }
        if (minutos < 10) {
            minutosTexto = '0' + minutos;
        }
        if (seg < 10) {
            segTexto = '0' + seg;
        }

        document.getElementById('cdDias').innerHTML  = dias;
        document.getElementById('cdHoras').innerHTML = horasTexto;
        document.getElementById('cdMin').innerHTML   = minutosTexto;
        document.getElementById('cdSeg').innerHTML   = segTexto;

        totalSegundos = totalSegundos - 1;
    }


    function addConvidado() {
        let input = document.getElementById('input_convidado');
        let nome  = input.value;

        if (nome == '') {
            alert('Por favor, insira o nome do convidado.');
            return;
        }

        let duplicado = false;
        for (let i = 0; i < convidados.length; i++) {
            if (convidados[i] == nome) {
                duplicado = true;
                break;
            }
        }

        if (duplicado) {
            alert('Este convidado já foi adicionado!');
            return;
        }

        convidados.push(nome);
        input.value = '';
        atualizar();
    }

    function removerConvidado() {
        if (confirm('Tem certeza que deseja remover este convidado?')) {
            let novaLista = [];
            for (let i = 0; i < convidados.length; i++) {
                if (convidados[i] != convidadoToRemove) {
                    novaLista.push(convidados[i]);
                }
            }
            convidados = novaLista;
            atualizar();
        }
    }


    function addEconomia() {
        let input = document.getElementById('input_economia');
        let valor = parseInt(input.value);

        if (input.value == '' || valor <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        economias.push(valor);
        input.value = '';
        atualizar();
    }

    function removerEconomia() {
        if (confirm('Tem certeza que deseja remover este valor?')) {
            let novaLista = [];
            for (let i = 0; i < economias.length; i++) {
                if (economias[i] != economiaToRemove) {
                    novaLista.push(economias[i]);
                }
            }
            economias = novaLista;
            atualizar();
        }
    }


    function atualizar() {
        totalConvidadosEl.innerHTML = convidados.length;

        let economiaTotal = 0;
        for (let i = 0; i < economias.length; i++) {
            economiaTotal = economiaTotal + economias[i];
        }

        totalMetaEl.innerHTML = 'R$ ' + economiaTotal;

        renderListas();
        atualizarGraficos();
    }


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

 
    function renderListas() {
        let htmlConvidados = '';
        for (let i = 0; i < convidados.length; i++) {
            htmlConvidados = htmlConvidados + '<div class="item"><span>' + convidados[i] + '</span>';
            htmlConvidados = htmlConvidados + '<button onclick="convidadoToRemove = \'' + convidados[i] + '\'; removerConvidado();" title="Remover">×</button></div>';
        }
        listaConvidadosEl.innerHTML = htmlConvidados;

        let htmlEconomia = '';
        for (let i = 0; i < economias.length; i++) {
            htmlEconomia = htmlEconomia + '<div class="item"><span>R$ ' + economias[i] + '</span>';
            htmlEconomia = htmlEconomia + '<button onclick="economiaToRemove = ' + economias[i] + '; removerEconomia();" title="Remover">×</button></div>';
        }
        listaEconomiaEl.innerHTML = htmlEconomia;
    }


    function atualizarGraficos() {
        let economiaTotal = 0;
        for (let i = 0; i < economias.length; i++) {
            economiaTotal = economiaTotal + economias[i];
        }

        let metaRestante = metaEconomia - economiaTotal;
        if (metaRestante < 0) {
            metaRestante = 0;
        }

        barraGrafico.data.datasets[0].data = [metaRestante, 0];
        barraGrafico.data.datasets[1].data = [0, convidados.length];
        barraGrafico.update();

        let porcentagens = [];
        let soma = 0;
        for (let i = 0; i < economias.length; i++) {
            soma = soma + economias[i];

            let porcentagem = (soma * 100) / metaEconomia;
            porcentagem = parseInt(porcentagem);

            if (porcentagem > 100) {
                porcentagem = 100;
            }

            porcentagens.push(porcentagem);
        }

        let labels = [];
        for (let i = 0; i < porcentagens.length; i++) {
            labels.push('Entrada ' + (i + 1));
        }

        linhaGrafico.data.labels = labels;
        linhaGrafico.data.datasets[0].data = porcentagens;
        linhaGrafico.update();

        let aviso = document.getElementById('avisoMeta');
        if (soma >= metaEconomia) {
            aviso.style.display = 'block';
        } else {
            aviso.style.display = 'none';
        }
    }

    atualizar();