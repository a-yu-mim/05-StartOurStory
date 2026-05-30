CREATE DATABASE StartOurStory;
USE StartOurStory;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL,
    fkParceiro INT UNIQUE NULL,
    CONSTRAINT fkUsuarioParceiro 
		FOREIGN KEY (fkParceiro) REFERENCES usuario(id)
);

CREATE TABLE codigo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT UNIQUE,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
    horarioUso DATETIME NULL,
    CONSTRAINT fkCodigoUsuario
        FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE convidado (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkUsuario INT,
    UNIQUE (nome, fkUsuario),
    CONSTRAINT fkConvidadoUsuario
		FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE economia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	valor DECIMAL(10,2) NOT NULL,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkUsuario INT,
    CONSTRAINT fkEconomiaUsuario
		FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

-- CREATE TABLE evento (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     horario DATETIME NOT NULL,
--     fkUsuario INT UNIQUE,
--     CONSTRAINT fkEventoUsuario
--         FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
-- );
