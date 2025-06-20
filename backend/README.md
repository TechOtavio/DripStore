# 🔧 DripStore - Backend

**DripStore (Backend)** é a API responsável por gerenciar dados da aplicação DripStore, incluindo autenticação, produtos, vendas e usuários. Desenvolvido com **Node.js** e **Express**, utilizando **MySQL** como banco de dados relacional.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv) — para variáveis de ambiente
- [bcrypt](https://www.npmjs.com/package/bcrypt) — para criptografia de senhas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — para autenticação via JWT
- [cors](https://www.npmjs.com/package/cors)

## 📁 Estrutura de Pastas

backend/
├── node_modules/ # Módulos instalados via npm
├── .env # Variáveis de ambiente (NÃO versionar)
├── .gitignore # Arquivos e pastas ignoradas pelo Git
├── index.mjs # Arquivo principal da API
├── package.json # Dependências e scripts do projeto
├── package-lock.json # Controle de versão das dependências


## ⚙️ Instalação e Execução

1. Clone o repositório e acesse o diretório do backend:
   ```bash
   git clone https://github.com/seu-usuario/dripstore.git
   cd dripstore/backend

2. Instale as dependências:

    ```bash
Copy
Edit
npm install

3. Crie um arquivo .env com as seguintes variáveis:

    ```bash
env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=dripstore
JWT=segredoJWT

4. Inicie a API:

bash
Copy
Edit
npm run dev