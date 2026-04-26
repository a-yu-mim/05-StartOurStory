// =========================================================
// |     "Onde vou rodar isso? Meu PC ou site real?"       |
// =========================================================
   let ambiente_processo = 'desenvolvimento';
// let ambiente_processo = 'producao';


// =========================================================
// |      "Se for produção então use .env,                 |
// |                  caso contrário use .env.dev"         |
// =========================================================
    const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';


// =========================================================
// |     "Lê esse arquivo e me deixe usar dados dele"      |
// =========================================================
    require("dotenv").config({ path: caminho_env });


// =========================================================
// |      "Estou fazendo as ferramentas para usar"         |
// =========================================================
    const express = require("express");
    const cors = require("cors");
    const path = require("path");


// =========================================================
// |   "Pega a porta e o endereço que coloquei no .env"    |
// =========================================================
    const PORTA_APP = process.env.APP_PORT;
    const HOST_APP = process.env.APP_HOST;


// =========================================================
// |              "Criando meu servidor"                   |
// =========================================================
    const app = express();


// =========================================================
// |               "Importação das rotas"                  |
// =========================================================
    const indexRouter = require("./src/routes/index");
    const usuarioRouter = require("./src/routes/usuarios");


// =========================================================
// |     "Permitir receber dados (tipo json ou input)"     |
// =========================================================
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));


// =========================================================
// |   "Tudo o que estiver na pasta public vai aparecer"   |
// =========================================================
    app.use(express.static(path.join(__dirname, "public")));


// =========================================================
// |         "Permitir conxão entre front e back"          |
// =========================================================
    app.use(cors());


// =========================================================
// |                 "Ligando as rotas"                    |
// =========================================================
    app.use("/", indexRouter);
    app.use("/usuarios", usuarioRouter);


// =========================================================
// |       "Ligando ao servidor e dando o link do site"    |
// =========================================================
    app.listen(PORTA_APP, function () {
    console.log(`
        
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  

    -----------------------------------------------------------
            Servidor: http://${HOST_APP}:${PORTA_APP} 
            Ambiente: ${process.env.AMBIENTE_PROCESSO}
    -----------------------------------------------------------
    `);
});
