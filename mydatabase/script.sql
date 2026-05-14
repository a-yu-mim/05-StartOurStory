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
	codigo INT AUTO_INCREMENT,
	fkUsuario INT,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (codigo, fkUsuario),
	CONSTRAINT fkCodigoUsuario
		FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
) AUTO_INCREMENT = 1000;

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

CREATE TABLE minigame (
	id INT AUTO_INCREMENT,
	caminho VARCHAR(100) NOT NULL,
	fkUsuario INT,
	PRIMARY KEY (id, fkUsuario),
	CONSTRAINT fkMinigameUsuario
		FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);
