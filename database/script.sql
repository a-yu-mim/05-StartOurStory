
CREATE DATABASE StartOurStory;
USE StartOurStory;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) UNIQUE,
	email VARCHAR(45) UNIQUE NOT NULL,
	senha VARCHAR(45) NOT NULL
);

CREATE TABLE convidado (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	id_usuario INT,
    UNIQUE (nome, id_usuario),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE economia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	valor DECIMAL(7,2) NOT NULL,
	id_usuario INT,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO usuario VALUES
(NULL, 'Julia', 'julia@123.com', 'Senha'),
(NULL, 'Ayumi', 'ayumi@gmail.com', '4yum1'),
(NULL, 'Yamasaki', 'yamasaki@hotmail.com', '0000');

INSERT INTO convidado VALUES
(NULL, 'Larissa', 1),
(NULL, 'Amanda', 1),
(NULL, 'Camilla', 1),
(NULL, 'Stella', 2),
(NULL, 'Daniel', 2),
(NULL, 'Hideki', 2),
(NULL, 'Tia Midori', 3),
(NULL, 'pai', 3),
(NULL, 'mãe', 3),
(NULL, 'Yukari', 3),
(NULL, 'Jhum', 3),
(NULL, 'Tia Kazumi', 3),
(NULL, 'Tio Denis', 3),
(NULL, 'Tia Mieko', 3),
(NULL, 'Tio Kaoru', 3),
(NULL, 'Tia Mayumi', 3),
(NULL, 'Tio Roberto', 3),
(NULL, 'Tio Hissamo', 3),
(NULL, 'Tia Janete', 3);