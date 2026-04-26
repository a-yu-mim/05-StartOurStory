// ------------------------------------------------
//       Acesso ao banco de dados MySQL 
// ------------------------------------------------

const mysql = require("mysql2");

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao, parametros = []) {

    if (!["producao", "desenvolvimento"].includes(process.env.AMBIENTE_PROCESSO)) {
        console.error("Ambiente não configurado corretamente (.env)");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO");
    }

    return new Promise ((resolve, reject) => {
        const conexao = mysql.createConnection(mySqlConfig);

        conexao.connect();

        conexao.query(instrucao, parametros,(erro, resultados) => {
            conexao.end();

            if (erro) {
                reject(erro);
            }

            resolve(resultados);
        });

        conexao.on('error', (erro) => {
            console.error("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};