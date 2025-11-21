# API Backend - Sistema de E-commerce

Este projeto é uma API RESTful desenvolvida em Node.js para gerenciar o backend de uma aplicação de e-commerce. O sistema inclui autenticação via JWT, cadastro de usuários, gerenciamento de perfil (com endereços e pagamentos), e CRUD de produtos.

## 🛠 Tecnologias Utilizadas

- **Node.js**: Plataforma de execução.
- **Express**: Framework web.
- **MySQL2**: Cliente de banco de dados com suporte a Promises.
- **JWT (JSON Web Token)**: Autenticação segura.
- **Bcrypt**: Criptografia de senhas.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Cors**: Controle de acesso HTTP.

## ⚙️ Instalação e Configuração

### 1. Pré-requisitos
- Node.js e npm instalados.
- Banco de dados MySQL em execução.

### 2. Instalação das dependências
Execute o comando abaixo na raiz do projeto:

```bash
npm install express cors mysql2 jsonwebtoken dotenv bcrypt
````

### 3\. Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto e preencha com suas credenciais:

```env
JWT=sua_chave_secreta_super_segura
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB=nome_do_banco_de_dados
DB_PORTA=3000
```

### 4\. Executando a API

Para iniciar o servidor:

```bash
node app.js
# Ou, se estiver usando nodemon:
nodemon app.js
# Ou, esse também funciona:
npm run dev
```

O servidor rodará por padrão na porta definida no `.env` (ou 3000).

-----

## 🔗 Endpoints da API

### 🔐 Autenticação

| Método | Rota | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| **POST** | `/cadastrarUsuario` | Cria novo usuário | `{ "usuario": { "nome": "...", "email": "...", "cpf": "...", "celular": "..." }, "senha": "..." }` |
| **POST** | `/verificarLogin` | Login e geração de Token | `{ "email": "...", "senha": "..." }` |

### 👤 Usuários e Perfil

*Algumas rotas exigem Token JWT no Header: `Authorization: Bearer <token>`*

| Método | Rota | Descrição | Detalhes |
|---|---|---|---|
| **GET** | `/usuarios` | Lista todos os usuários | Retorna array de usuários |
| **GET** | `/perfil/:id` | Dados completos do usuário | Inclui dados pessoais, endereço e cartões |
| **GET** | `/dadosAdm` | Rota protegida (Admin) | Requer `id_roles = 1` |
| **PUT** | `/alterarSenha/:id` | Atualiza senha | Body: `{ "senha": "nova_senha" }` |
| **PUT** | `/alterarInformacoes/:id` | Atualiza perfil e endereço | Atualiza tabelas `usuarios` e `enderecos` via transação |

### 💳 Pagamentos

| Método | Rota | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| **POST** | `/adicionarPagamento` | Adiciona cartão | `{ "nomeCartao": "...", "numeroCartao": "...", "cvv": "...", "id_usuario": 1, "validade": "..." }` |
| **DELETE** | `/deletarPagamento/:id` | Remove cartão | - |

### 📦 Produtos

| Método | Rota | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| **GET** | `/produtos` | Lista todos os produtos | - |
| **GET** | `/produtos/:id` | Detalhes de um produto | - |
| **POST** | `/produtos` | Cadastra novo produto | `{ "nome": "...", "descricao": "...", "preco": 10.5, "categoria": "...", "estoque": 100, "imagem": "url..." }` |

-----

## 🗄️ Estrutura do Banco de Dados (Tabelas Esperadas)

O código SQL espera as seguintes tabelas no banco de dados:

1.  **usuarios**: `id`, `nome`, `email`, `senha`, `cpf_cnpj`, `telefone`, `id_roles`
2.  **enderecos**: `id`, `id_usuario`, `rua`, `bairro`, `cidade`, `cep`
3.  **pagamento**: `id`, `id_usuario`, `nomeCartao`, `numeroCartao`, `cvv`, `validade`
4.  **produtos**: `id`, `nome`, `descricao`, `preco`, `categoria`, `quantidade_estoque`, `imagem`

## 🛡️ Segurança

  - As senhas são armazenadas como hash utilizando **Bcrypt**.
  - Rotas sensíveis são protegidas por middleware que verifica a validade do **JWT**.
