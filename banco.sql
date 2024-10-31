CREATE TABLE Item (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

-- Tabela para as comandas
CREATE TABLE Comanda (
    id SERIAL PRIMARY KEY,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'aberta'
);

-- Tabela para os pedidos de itens nas comandas
CREATE TABLE Pedido (
    id SERIAL PRIMARY KEY,
    comanda_id INT REFERENCES Comanda(id),
    item_id INT REFERENCES Item(id),
    quantidade INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente'
);

-- Tabela para os usuários
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

SELECT * FROM Item
SELECT * FROM Comanda
SELECT * FROM Pedido
SELECT * FROM Usuario

ALTER TABLE Pedido ALTER COLUMN status SET DEFAULT FALSE;
ALTER TABLE Pedido DROP COLUMN status;
ALTER TABLE Pedido ADD COLUMN status BOOLEAN;

ALTER TABLE Item DROP COLUMN tipo;
ALTER TABLE Item ADD COLUMN tipo BOOLEAN;

INSERT INTO Item (nome, tipo, preco) VALUES
('Picanha', TRUE, 45.00),            
('Cerveja', FALSE, 8.00),            
('Suco de Laranja', FALSE, 5.00),    
('Salada Caesar', TRUE, 25.00),      
('Espaguete à Bolonhesa', TRUE, 30.00); 

INSERT INTO Usuario (nome, senha, email) VALUES
('Admin', 'admin', 'admin@galema.com'),
('Maicon', 'maicon', 'maicon@galema.com'),
('Gabriel', 'gabriel', 'gabriel@galema.com'),
('Zani', 'zani', 'zani@galema.com');

INSERT INTO Pedido (comanda_id, item_id, quantidade) VALUES
(1, 1, 2),  -- 2x Picanha (pendente)
(1, 2, 3),  -- 3x Cerveja (pendente)
(1, 4, 1);  -- 1x Salada Caesar (pendente)

INSERT INTO Comanda (id) values
(3);

UPDATE Comanda SET data_fechamento = CURRENT_TIMESTAMP, ComAberta = FALSE WHERE id = 3;

UPDATE Comanda 
SET data_fechamento = NOW(), ComAberta = FALSE 
WHERE id = 2;

ALTER TABLE Comanda DROP COLUMN status;
ALTER TABLE Comanda ADD COLUMN ComAberta BOOLEAN;
ALTER TABLE Comanda

ALTER COLUMN ComAberta SET DEFAULT TRUE;