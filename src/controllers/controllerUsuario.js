// ---------------------------------------------------
//  Controller recebe dados, valida e chama o model 
// ---------------------------------------------------

const usuarioModel = require("../models/modelUsuario");

function cadastrar(req, res) {
    const nome = req.body.nomeServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    
    if (nome == undefined) {
        res.status(400).send("Nome não informado");
    } else if (email == undefined) {
        res.status(400).send("Email não informado");
    } else if (senha == undefined) {
        res.status(400).send("Senha não informada");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (err) {
                    console.log(err);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        err.sqlMessage
                    );
                    res.status(500).json(err.sqlMessage);
                }
            );
    }
}

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Email não informado");
    } else if (senha == undefined) {
        res.status(400).send("Senha não informada");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (err) {
                    console.log(err);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", err.sqlMessage);
                    res.status(500).json(err.sqlMessage);
                }
            );
    }

}


module.exports = {
    cadastrar,
    autenticar
}