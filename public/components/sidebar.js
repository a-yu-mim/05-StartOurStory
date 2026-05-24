
fetch('/components/sidebar.html')
    .then(function (resposta) {
        return resposta.text();
    })
    .then(function (conteudo) {
        document.getElementById('sidebar').innerHTML = conteudo;
    });

    