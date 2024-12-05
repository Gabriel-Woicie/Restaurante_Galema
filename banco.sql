SELECT * FROM COMANDAS
SELECT * FROM FUNCIONARIOS
SELECT * FROM PRODUTOS
SELECT * FROM USUARIOS
SELECT * FROM PRODUTOSCOMANDA

CREATE TABLE funcionarios (
  idfuncionario SERIAL PRIMARY KEY,
  nomefuncionario VARCHAR(255) NOT NULL,
  salario DECIMAL NOT NULL,
  datacontratacao DATE NOT NULL,
  datademissao DATE,
  situacaofuncionario INTEGER NOT NULL
);

CREATE TABLE comandas (
  idcomanda SERIAL PRIMARY KEY NOT NULL,
  situacaocomanda BOOLEAN NOT NULL,
  valorcomanda DECIMAL,
  nomecomanda VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
  idproduto SERIAL PRIMARY KEY NOT NULL,
  nomeproduto VARCHAR(255) NOT NULL,
  descricao VARCHAR(255),
  categoria BOOLEAN NOT NULL,
  valorproduto DECIMAL(10, 2) NOT NULL,
  imagem VARCHAR(255)
);

CREATE TABLE usuarios (
  idusuario SERIAL PRIMARY KEY,
  login VARCHAR(50) NOT NULL,
  senha VARCHAR(20) NOT NULL);
  
 
CREATE TABLE produtoscomanda (
  idprodcomanda SERIAL PRIMARY KEY,
  idcomanda INTEGER NOT NULL,
  idproduto INTEGER NOT NULL,
  itemqtdade INTEGER NOT NULL,
  FOREIGN KEY (idcomanda) REFERENCES comandas(idcomanda),
  FOREIGN KEY (idproduto) REFERENCES produtos(idproduto)
);


INSERT INTO funcionarios (nomefuncionario, salario, datacontratacao, datademissao, situacaofuncionario)
VALUES
  ('João Silva', 2500.50, '2022-06-01', NULL, 1),
  ('Maria Oliveira', 3200.75, '2021-03-15', '2023-01-20', 0),
  ('Carlos Souza', 2900.60, '2020-08-10', NULL, 1),
  ('Ana Costa', 3500.40, '2023-02-01', NULL, 1),
  ('Ricardo Pereira', 2800.00, '2022-11-10', NULL, 1);

INSERT INTO produtos (nomeproduto, descricao, categoria, valorproduto)
VALUES
  ('Café', 'Café preto', false, 5.00),
  ('Refrigerante', 'Refrigerante sabor cola', false, 7.50),
  ('Lanche', 'Lanche natural', true, 15.00),
  ('Pizza', 'Pizza de calabresa', true, 30.00),
  ('Suco', 'Suco de laranja', false, 6.00);

INSERT INTO comandas (situacaocomanda, valorcomanda, nomecomanda)
VALUES
  (true, 00.00, 'maicon'),
  (false, 00.00, 'joao'),
  (true, 00.00, 'maria'),
  (true, 00.00, 'carlos'),
  (false, 00.00, 'gabriel');

INSERT INTO usuarios (login, senha)
VALUES
  ('galema', '123')
  
  
INSERT INTO produtoscomanda (idcomanda, idproduto, itemqtdade) VALUES 
(4, 2, 3), -- Comanda 1, Produto 2, Quantidade 3
(4, 3, 5) -- Comanda 2, Produto 3, Quantidade 5

INSERT INTO produtoscomanda (idcomanda, idproduto, itemqtdade) VALUES 
(1, 2, 3), -- Comanda 1, Produto 2, Quantidade 3
(2, 3, 5), -- Comanda 2, Produto 3, Quantidade 5
(3, 1, 2), -- Comanda 3, Produto 1, Quantidade 2
(1, 4, 1), -- Comanda 1, Produto 4, Quantidade 1
(2, 5, 4); -- Comanda 2, Produto 5, Quantidade 4

  
CREATE OR REPLACE FUNCTION verificar_login(usuario VARCHAR(50), senha1 VARCHAR(20))
RETURNS BOOLEAN AS
$$
DECLARE
    resultado BOOLEAN;
BEGIN
    IF EXISTS (
        SELECT 1
        FROM usuarios
        WHERE login = usuario AND senha = senha1
    ) THEN
        resultado := TRUE;
    ELSE
        resultado := FALSE;
    END IF;
    RETURN resultado;
END;
$$
LANGUAGE plpgsql;

SELECT * FROM verificar_login('galema', '123');

-- Função que calcula e atualiza o valor total da comanda
CREATE OR REPLACE FUNCTION atualizar_valor_comanda()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualiza o valor total da comanda
  UPDATE comandas
  SET valorcomanda = (
    SELECT SUM(pc.itemqtdade * p.valorproduto)
    FROM produtoscomanda pc
    JOIN produtos p ON pc.idproduto = p.idproduto
    WHERE pc.idcomanda = NEW.idcomanda
  )
  WHERE idcomanda = NEW.idcomanda;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para executar a função após inserir ou atualizar na tabela produtoscomanda
CREATE TRIGGER trigger_atualizar_valor_comanda
AFTER INSERT OR UPDATE OR DELETE ON produtoscomanda
FOR EACH ROW
EXECUTE FUNCTION atualizar_valor_comanda();