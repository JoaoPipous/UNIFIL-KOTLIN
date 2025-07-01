const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Armazena as tarefas em memória
const tasks = [];

// Endpoint de login (fake)
app.post('/Login', (req, res) => {
    const { username } = req.body;

    if (username && username.trim() !== '') {
        return res.json({ token: 'fake-token-' + username });
    }

    return res.status(400).json({ error: 'Usuário inválido' });
});

// Endpoint para listar tarefas
app.get('/identified/getData', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token ausente' });
    }

    // Retorna todas as tarefas (em memória)
    return res.json(tasks);
});

// Endpoint para salvar uma nova tarefa
app.post('/identified/saveData', (req, res) => {
    const token = req.headers.authorization;
    const { description } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Token ausente' });
    }

    if (!description || description.trim() === '') {
        return res.status(400).json({ error: 'Descrição ausente' });
    }

    // Formato compatível com o app: precisa ter campo "data"
    const newTask = {
        id: tasks.length + 1,
        data: {
            description: description
        }
    };

    tasks.push(newTask);

    return res.status(201).json(newTask);
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API rodando na porta ${PORT}`);
});
