const express = require('express');
const path = require('path');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos da pasta 'public'

require('dotenv').config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "*****" : null);
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true
    }
};

// Rota para registro de usuário
app.post('/signup', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('nome', sql.VarChar, nome);
        request.input('email', sql.VarChar, email);
        request.input('senha', sql.VarChar, senha);

        await request.query(`
            INSERT INTO [dbo].[signup] (nome, email, senha)
            VALUES (@nome, @email, @senha);
        `);

        res.status(201).send('Usuário cadastrado com sucesso.');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário.');
    }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input('email', sql.VarChar, email);
        const result = await request.query(`
            SELECT * FROM [dbo].[signup] WHERE email = @email;
        `);

        const user = result.recordset[0];
        if (user) {
            if (user.senha === senha) {
                res.json({ success: true, user });
            } else {
                res.status(401).send('Senha incorreta.');
            }
        } else {
            res.status(401).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login.');
    }
});

app.post('/atualizarVida', async (req, res) => {
    const { vidaHeroi, vidaVilao } = req.body;

    if (typeof vidaHeroi !== 'undefined' && typeof vidaVilao !== 'undefined' && !isNaN(vidaHeroi) && !isNaN(vidaVilao)) {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            await request.query(`
                MERGE INTO jogo AS target
                USING (VALUES('heroi', ${vidaHeroi}), ('vilao', ${vidaVilao})) AS source (Nome, Vida)
                ON target.Nome = source.Nome
                WHEN MATCHED THEN
                    UPDATE SET Vida = source.Vida
                WHEN NOT MATCHED THEN
                    INSERT(Nome, Vida) VALUES (source.Nome, source.Vida);
            `);
            res.status(200).send('Vida do herói e do vilão atualizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar vida do herói e do vilão:', error);
            res.status(500).send('Erro ao atualizar a vida do herói e do vilão.');
        }
    } else {
        console.error('Erro ao atualizar a vida do herói e do vilão: vidaHeroi ou vidaVilao estão indefinidos ou não são números válidos.');
        res.status(400).send('Erro ao atualizar a vida do herói e do vilão: vidaHeroi ou vidaVilao.');
    }
});

app.get('/characters', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const heroResult = await request.query("SELECT * FROM jogo WHERE Nome = 'heroi'");
        const heroi = heroResult.recordset[0];

        const villainResult = await request.query("SELECT * FROM jogo WHERE Nome = 'vilao'");
        const vilao = villainResult.recordset[0];

        res.json({ heroi, vilao });
    } catch (error) {
        console.error('Erro ao obter os dados do herói e do vilão:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do herói e do vilão.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
