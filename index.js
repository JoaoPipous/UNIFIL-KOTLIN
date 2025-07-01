const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.post('/Login', (req, res) => {
    const { username } = req.body;
    if (username && username.trim() !== '') {
        return res.json({ token: 'fake-token-' + username });
    }
    return res.status(400).json({ error: 'Usuário inválido' });
});

app.get('/identified/getData', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Token ausente' });
    return res.json(tasks);
});

app.post('/identified/saveData', (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Token ausente' });

    const { description } = req.body;
    const newTask = {
        id: tasks.length + 1,
        taskData: { description: description || 'Sem descrição' }
    };
    tasks.push(newTask);
    return res.json(newTask);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));
