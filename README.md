# 🛍️ DripStore

**DripStore** é uma aplicação web fullstack para exibição, organização e gerenciamento de produtos — ideal para lojas virtuais ou catálogos de e-commerce. A aplicação é dividida em **Frontend** (interface e interação) e **Backend** (API e banco de dados).


## 🧩 Funcionalidades

- Catálogo de produtos com ordenação
- Sistema de autenticação (login/cadastro)
- Cadastro e visualização de vendas
- Interface responsiva e moderna
- Integração com API RESTful


## 🚀 Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)1
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/) — para estilização e responsividade
- [Lucide React](https://lucide.dev/) — ícones SVG modernos

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv) — variáveis de ambiente
- [bcrypt](https://www.npmjs.com/package/bcrypt) — criptografia de senhas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — autenticação via JWT
- [cors](https://www.npmjs.com/package/cors)

---

## 📁 Estrutura de Pastas

dripstore/ <br/>
├── backend/<br/>
│ ├── .env # Variáveis de ambiente (não versionar)<br/>
│ ├── .gitignore<br/>
│ ├── index.mjs # Arquivo principal da API<br/>
│ ├── package.json<br/>
│ └── ...<br/>
│<br/>
├── ProjetoFinal/ # Diretório do frontend<br/>
│ ├── public/<br/>
│ ├── src/<br/>
│ │ ├── assets/ # Imagens e arquivos estáticos<br/>
│ │ ├── components/ # Componentes reutilizáveis<br/>
│ │ ├── contexts/ # Context API (estado global)<br/>
│ │ ├── pages/ # Páginas principais da aplicação<br/>
│ │ ├── routes/ # Configuração das rotas<br/>
│ │ ├── App.jsx # Componente principal<br/>
│ │ └── main.jsx # Ponto de entrada do React<br/>
│ ├── .gitignore<br/>
│ ├── package.json<br/>
│ ├── vite.config.js<br/>
│ └── ...<br/>


## ⚙️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dripstore.git
cd dripstore


2. Backend

Acesse a pasta e instale as dependências:
cd backend
npm install

Configure o .env:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=dripstore
JWT=segredoJWT

Inicie o servidor:
npm run dev

3. Frontend
Acesse a pasta do frontend:
cd ProjetoFinal
npm install

Inicie o aplicativo React:
npm run dev