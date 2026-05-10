CREATE DATABASE StartOurStory;
USE StartOurStory;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) UNIQUE NOT NULL,
	email VARCHAR(45) UNIQUE NOT NULL,
	senha VARCHAR(45) NOT NULL,
	fkParceiro INT NULL,
	CONSTRAINT fkUsuarioParceiro 
		FOREIGN KEY (fkParceiro) REFERENCES usuario(id)
);

CREATE TABLE codigo (
	codigo INT PRIMARY KEY AUTO_INCREMENT,
	fkUsuario INT NOT NULL,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
) AUTO_INCREMENT = 1000;

CREATE TABLE casamento (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dataCasamento DATE,
	horario TIME,
	fkUsuario1 INT NULL,
	fkUsuario2 INT NULL,
	CONSTRAINT fkCasamentoUsuario1
		FOREIGN KEY (fkUsuario1) REFERENCES usuario(id),
	CONSTRAINT fkCasamentoUsuario2
		FOREIGN KEY (fkUsuario2) REFERENCES usuario(id)
);

CREATE TABLE convidado (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	fkUsuario INT,
	UNIQUE (nome, fkUsuario),
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE economia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	valor DECIMAL(7,2),
	fkUsuario INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);
