
fetch('/components/sidebar.html')
    .then(function (resposta) {
        return resposta.text();
    })
    .then(function (conteudo) {
        document.getElementById('sidebar').innerHTML = conteudo;

        let usuarioId = sessionStorage.ID_USUARIO;
        let codigo = document.getElementById('codigo');

        return fetch(`/codigo/${usuarioId}`)
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (dados) {
                codigo.innerHTML = `${dados.codigo}`;
            })
            .catch(function (erro) {
                codigo.innerHTML = erro.message;
            });
    });
