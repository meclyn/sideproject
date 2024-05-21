const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

//conectando ao mongodb
mongoose.connect('mongodb://localhost/secretproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Modelo de usuario

const User = require('./models/User');

//Rotas de aut.

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    //criar um novo user
    const user = new User ({ username, password: hashedPassword});
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    //verificar se o user existe
    const user = await User.findOne({ username});
    if (!user) {
        return res.status(400).send('Usuario não encontrado');
    }

    // gerar um token jwt
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.send({ token});
});

app.listen(3000, () => {
    console.log('Servidor subiu porta 3000')
})