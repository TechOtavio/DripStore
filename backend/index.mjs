import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

// Configuração do dotenv
dotenv.config()
const senhaJWT = '1234'

// Conexão com o banco de dados MySQL
const conexao = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

const porta = process.env.DB_PORTA


const app = express()
app.use(cors())
app.use(express.json())


// Middleware para autenticação de usuário
function autenticarUsuario(req, res, next){
   const token = req.headers.authorization?.split(' ')[1]
   if (!token){
    return res.status(401).json({msg: 'token não fornecido'})
   }
   try{
    const usuario = jwt.verify(token, senhaJWT)
    req.usuario = usuario
    next()
   }catch(error){
    return res.status(403).json({msg:'Token invalido'})
   }
}


// Rotas APIs
app.get('/dadosAdm', autenticarUsuario, (req, res) => {
  if (req.usuario.tipo !== 1) {
    return res.status(403).json({ msg: 'Acesso restrito a administradores' });
  }
  return res.send(`Bem-vindo, administrador ${req.usuario.nome}`);
});

app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await conexao.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

app.get('/perfil/:id', async (req, res) => {
  try {
    let id = req.params.id
    const [rows] = await conexao.execute(`SELECT 
  u.id, u.nome, u.email, u.senha, u.data_cadastro, u.id_roles, u.cpf_cnpj, u.telefone,
  e.cep, e.rua, e.bairro, e.cidade, 
  GROUP_CONCAT(p.nomeCartao SEPARATOR ' | ') AS cartoes,
  GROUP_CONCAT(p.numeroCartao SEPARATOR ' | ') AS numerosCartoes
  FROM usuarios u
  JOIN enderecos e ON u.id = e.id_usuario
  JOIN pagamento p ON u.id = p.id_usuario
  WHERE u.id = ${id}
  GROUP BY 
  u.id, u.nome, u.email, u.senha, u.data_cadastro, 
  u.id_roles, u.cpf_cnpj, u.telefone,
  e.cep, e.rua, e.bairro, e.cidade;
`)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar usuários')
  }
})

app.post('/cadastrarUsuario', async (req, res) => {
  const { nome, email, senha, id_roles} = req.body
  try{
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    
    const sql = `INSERT INTO usuarios (nome, email, senha, id_roles) VALUES (?, ?, ?, ?)'`
    const valores = [nome, email, senhaCriptografada, id_roles]

    await conexao.query(sql, valores)

    res.status(201).json({ msg: 'usuário cadastrado com secesso!'})
  }catch(erro){
    console.error(erro)
    res.status(500).json({ errp: 'Erro ao cadastrar usuário'})
  }
})

app.post('/verificarLogin', async (req, res) => {
  const { email, senha } = req.body;
  console.log({ email, senha });

  try {
    // Busca o usuário apenas pelo email
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await conexao.query(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
    }

    const usuario = rows[0];

    // Compara a senha digitada com o hash do banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
    }

    // Gera o token JWT
    const token = jwt.sign({
      id: usuario.id,
      nome: usuario.nome,
      tipo: usuario.id_roles
    }, senhaJWT, {
      expiresIn: '1h'
    });

    res.status(200).json({
      sucesso: true,
      usuario,
      token
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

app.get('/produtos', (req, res) => {
  const query = 'SELECT * FROM produtos';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    res.json(results);
  });
});






app.listen(porta, () => {
    console.log('O servidor está rodando na porta 3000')
})