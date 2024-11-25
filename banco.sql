CREATE TABLE tiposrestaurantes(
	idtiporestaurante SERIAL PRIMARY KEY,
	nometiporestaurante VARCHAR(50) NOT NULL
);

CREATE TABLE restaurantes(
	idrestaurante SERIAL PRIMARY KEY,
	nomerestaurante VARCHAR(50) NOT NULL,
	idtiporestaurante INTEGER REFERENCES tiposrestaurantes(idtiporestaurante)
);

CREATE TABLE mesas(
	idmesa SERIAL PRIMARY KEY,
	situacaomesa INTEGER NOT NULL,
	idrestaurante INTEGER REFERENCES restaurantes(idrestaurante)
);

CREATE TABLE funcionarios(
	idfuncionario SERIAL PRIMARY KEY,
	nomefuncionario VARCHAR(50) NOT NULL,
	salario DECIMAL(10,2) NOT NULL,
	datacontratacao DATE NOT NULL,
	datademissao DATE,
	cargo INTEGER NOT NULL,
	situacaofuncionario INTEGER NOT NULL,
	login VARCHAR(50) NOT NULL UNIQUE,
	senha VARCHAR(20) NOT NULL,
	idrestaurante INTEGER REFERENCES restaurantes(idrestaurante)
);

CREATE TABLE produtos(
	idproduto SERIAL PRIMARY KEY,
	nomeproduto VARCHAR(50) NOT NULL,
	situacaoproduto INTEGER NOT NULL,
	descricao VARCHAR(200),
	categoria INTEGER NOT NULL,
	valorproduto DECIMAL(10,2) NOT NULL,
	idrestaurante INTEGER REFERENCES restaurantes(idrestaurante)
);

CREATE TABLE comandas(
	idcomanda SERIAL PRIMARY KEY,
	situacaocomanda INTEGER NOT NULL,
	valorcomanda DECIMAL(10,2),
	idmesa INTEGER REFERENCES mesas(idmesa),
	idfuncionario INTEGER REFERENCES funcionarios(idfuncionario)
);

CREATE TABLE pedidos(
	idpedido SERIAL PRIMARY KEY,
	datapedido DATE NOT NULL,
	valorpedido DECIMAL(10,2) NOT NULL,
	situacaopedido INTEGER NOT NULL,
	idcomanda INTEGER REFERENCES comandas(idcomanda)
);

CREATE TABLE itenspedidos(
	iditempedido SERIAL PRIMARY KEY,
	qtditempedido INTEGER NOT NULL,
	itemsituacao INTEGER NOT NULL,
	idproduto INTEGER REFERENCES produtos(idproduto),
	idpedido INTEGER REFERENCES pedidos(idpedido)
);

-- TIPOS DE RESTAURANTE
INSERT INTO tiposrestaurantes (nometiporestaurante) VALUES ('GOURMET'),('QUIOSQUE');

-- RESTAURANTES
INSERT INTO restaurantes (nomerestaurante,idtiporestaurante) VALUES ('DEFAULT GOURMET', 1), ('DEFAULT QUIOSQUE', 2);

-- MESAS
INSERT INTO mesas (situacaomesa, idrestaurante) VALUES  (1,1), (1,1), (1,1), (1,1), (1,1), (1,2), (1,2), (1,2), (1,2), (1,2);

-- FUNCIONÁRIOS
-- SITUAÇÃO: 1 - ATIVO, 2 - INATIVO
-- CARGO: 1 - GERENTE, 2 - ATENDENTE, 3 - CAIXA, 4 - COZINHA

-- DEFAULT GOURMET
INSERT INTO funcionarios (nomefuncionario,salario,datacontratacao,cargo,situacaofuncionario,login,senha,idrestaurante) VALUES
('ÉRICK JACQUIN', 20000,'2023-09-01',1,1,'ERICK', 'ERICK123',1),('MARIA EDUARDA', 3000,'2023-09-10',2,1,'MARIA', 'MARIA123',1),
('JOÃO PEDRO', 3500,'2023-09-11',3,1,'JOAO', 'JOAO123',1),('RENÊ VELMONT', 3750,'2023-09-12',4,1,'RENE', 'RENE123',1);

-- DEFAULT QUIOSQUE
INSERT INTO funcionarios (nomefuncionario,salario,datacontratacao,cargo,situacaofuncionario,login,senha,idrestaurante) VALUES
('HENRIQUE FOGAÇA', 15000,'2023-03-10',1,1,'HENRIQUE', 'HENRIQUE123',2),('GABRIEL MELO', 3500,'2023-05-01',2,1,'GABRIEL', 'GABRIEL123',2),
('ISABELA DE OLIVEIRA', 3000,'2023-05-02',3,1,'ISABELA', 'ISABELA123',2),('ENRICO BOLGARI', 3750,'2023-05-03',4,1,'ENRICO', 'ENRICO123',2);

-- PRODUTOS
-- SITUAÇÃO: 1 - ATIVO, 2 - INATIVO
-- CATEGORIA: 1 - COMIDA, 2 - BEBIDAS, 3 - SOBREMESAS

-- DEFAULT GOURMET
INSERT INTO produtos (nomeproduto, situacaoproduto, categoria, valorproduto, idrestaurante) VALUES 
('RISOTO DE CAMARÃO',1,1,75,1),('VINHO LA ROMANÉE GRAND CRU',1,2,3000,1),('PETT GATEAU',1,3,30,1),
('SPAGHETTI CARBONARA',1,1,45,1),('CHAMPAGNE CRISTAL LOUIS ROEDERER BRUT',1,2,2000,1),('CHEESECAKE',1,3,25,1);

-- DEFAULT QUIOSQUE
INSERT INTO produtos (nomeproduto, situacaoproduto, categoria, valorproduto, idrestaurante) VALUES 
('HAMBÚRGUER DE COSTELA',1,1,35,2),('CERVEJA RED ALE',1,2,20,2),('PUDIM',1,3,12,2),
('PORÇÃO DE TILÁPIA',1,1,40,2),('COCA COLA LATA',1,2,5,2),('COCADA',1,3,10,2);

-- STORED PROCEDURE

-- STORED PROCEDURE LOGIN

CREATE OR REPLACE FUNCTION public.verificar_login_senha(login_param VARCHAR(50), senha_param VARCHAR(20))
 RETURNS TABLE(cargo INTEGER, restaurante INTEGER,  login_correto BOOLEAN)
 LANGUAGE plpgsql
AS $function$
DECLARE
    cargo_funcionario 		INTEGER;
   	restaurante_funcionario INTEGER;
BEGIN
    cargo_funcionario 		:= NULL;
   	restaurante_funcionario := NULL;

    SELECT f.cargo, f.idrestaurante INTO cargo_funcionario, restaurante_funcionario
    FROM funcionarios f
    INNER JOIN usuarios u ON f.idusuario = u.idusuario
    WHERE u.login = login_param AND u.senha = senha_param AND f.situacaofuncionario = 1 AND f.cargo = 1  
    LIMIT 1;

    IF cargo_funcionario IS NOT NULL THEN
        RETURN QUERY SELECT cargo_funcionario cargo, restaurante_funcionario restaurante, TRUE login_correto;
    ELSE
        RETURN QUERY SELECT 0 cargo, 0 restaurante, FALSE login_correto;
    END IF;

END;
$function$
;

SELECT verificar_login_senha('ERICK', 'ERICK123')

-- FIM STORED PROCEDURE LOGIN