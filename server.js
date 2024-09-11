const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/secretproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});


const idea = require('./models/idea');

app.post('/ideas', async (req, res) => {
    const { title, content } = req.body;
    const idea = new Idea({ title, content});
    await idea.save();
    res.status(201).send('Ideia adicionada com sucesso');
});

app.get('/ideas', async (req, res) => {
    const ideas = await Idea.aggregate([
        {
            $group: {
                _id: "$title",
                ideas: { $push: "$$ROOT"}
            }
        }
    ]);
    res.send(ideas);
});

// Modelo de usuário
const User = require('./models/User');

// Rotas de autenticação
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário já existe!
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Usuário já existe');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send('Usuário registrado com sucesso');
});



app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Usuário não encontrado');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Senha incorreta');
    }

    // Gerar um token JWT
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token });
});

// Rota GET para a raiz
app.get('/', (req, res) =>{
    res.send('Servidor está funcionando');
});

app.listen(3000, () => {
    console.log('Servidor subiu na porta 3000');
});
