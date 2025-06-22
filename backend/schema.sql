CREATE DATABASE dripstore;
use dripstore;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
id_roles int,
FOREIGN KEY(id_roles) REFERENCES roles(id) ON DELETE CASCADE,
cpf_cnpj VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE pedidos(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario int,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
valor_total DECIMAL(10,2) DEFAULT(0),
estado ENUM('pendente', 'cancelado', 'concluido') DEFAULT 'pendente'
);

CREATE TABLE produtos(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
preco DECIMAL(10,2) DEFAULT(0),
categoria VARCHAR(20) NOT NULL,
descricao TEXT ,
quantidade_estoque INT DEFAULT(0)
);

CREATE TABLE pedido_produto(
id_pedido INT,
quantidade_produtos_pedidos INT DEFAULT(0),
preco_unitario DECIMAL(10,2),
FOREIGN KEY (id_pedido) REFERENCES pedidos(id) ON DELETE CASCADE,
id_produto INT,
FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE CASCADE,
PRIMARY KEY (id_pedido, id_produto)
);

SELECT 
usuarios.nome NomeUser,
produtos.nome NomeProduto, 
preco, 
categoria, 
quantidade_estoque,
quantidade_produtos_pedidos,
preco_unitario,
valor_total,
estado
FROM produtos
JOIN pedido_produto ON pedido_produto.id_produto = produtos.id
JOIN pedidos ON pedido_produto.id_pedido = pedidos.id
JOIN usuarios ON pedidos.id_usuario = usuarios.id
JOIN roles ON usuarios.id_roles = roles.id;