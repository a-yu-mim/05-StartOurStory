CREATE DATABASE StartOurStory;
USE StartOurStory;
drop DATABASE startourstory;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) UNIQUE NOT NULL,
	senha VARCHAR(45) NOT NULL,
	fkParceiro INT,
	CONSTRAINT fkUsuarioParceiro 
		FOREIGN KEY (fkParceiro) REFERENCES usuario(id)
);

CREATE TABLE codigo (
	codigo VARCHAR(45) PRIMARY KEY,
	fkUsuario INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE convidado (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	fkUsuario INT,
    UNIQUE (nome, fkUsuario),
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE economia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	valor DECIMAL(7,2) NOT NULL,
	fkUsuario INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);
