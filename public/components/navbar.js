
fetch('/components/navbar.html')
    .then(function (resposta) {
        return resposta.text();
    })
    .then(function (conteudo) {
        document.getElementById('navbar').innerHTML = conteudo;
    });

    