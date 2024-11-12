CREATE TABLE Item (
    idItem SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo BOOLEAN,
    preco DECIMAL(10, 2) NOT NULL
);

-- Tabela para as comandas
CREATE TABLE Comanda (
    idComanda SERIAL PRIMARY KEY,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    comAberta BOOLEAN DEFAULT TRUE
);

-- Tabela para os pedidos de itens nas comandas
CREATE TABLE Pedido (
    idPedido SERIAL PRIMARY KEY,
    comanda_idComanda INT REFERENCES Comanda(idComanda),
    item_idItem INT REFERENCES Item(idItem),
    quantidade INT NOT NULL,
    status BOOLEAN
);

-- Tabela para os usuários
CREATE TABLE Usuario (
    idUsuario SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

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

INSERT INTO Comanda (idComanda) values
(1);

INSERT INTO Pedido (comanda_id, item_id, quantidade) VALUES
(1, 1, 2),  -- 2x Picanha (pendente)
(1, 2, 3),  -- 3x Cerveja (pendente)
(1, 4, 1);  -- 1x Salada Caesar (pendente)