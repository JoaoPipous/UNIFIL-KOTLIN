const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.post('/Login', (req, res) => {
    const { username } = req.body;
    if (username) {
        return res.json({ token: 'fake-token-' + username });
    }
    return res.status(400).json({ error: 'Usuário inválido' });
});

app.get('/identified/getData', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Sem token' });
    return res.json(tasks);
});

app.post('/identified/saveData', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Sem token' });

    const { description } = req.body;
    const id = tasks.length + 1;
    tasks.push({ id, taskData: { description } });
    return res.json({ id, taskData: { description } });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
