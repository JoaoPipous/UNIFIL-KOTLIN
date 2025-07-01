const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Armazenamento de tarefas por usuário
// Exemplo: { "joao": [ { id, data: { description } }, ... ] }
const tasks = {};

// Endpoint de login (retorna token fake com nome do usuário)
app.post('/Login', (req, res) => {
  const { username } = req.body;

  if (username && username.trim() !== '') {
    return res.json({ token: 'fake-token-' + username });
  }

  return res.status(400).json({ error: 'Usuário inválido' });
});

// Endpoint para listar tarefas por usuário (com base no token)
app.get('/identified/getData', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token ausente' });
  }

  const username = token.replace('Bearer fake-token-', '');

  // Se o usuário não tem tarefas, retorna lista vazia
  const userTasks = tasks[username] || [];
  return res.json(userTasks);
});

// Endpoint para salvar uma nova tarefa para o usuário
app.post('/identified/saveData', (req, res) => {
  const token = req.headers.authorization;
  const { description } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Token ausente' });
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({ error: 'Descrição ausente' });
  }

  const username = token.replace('Bearer fake-token-', '');

  // Inicializa lista se usuário ainda não tiver tarefas
  if (!tasks[username]) {
    tasks[username] = [];
  }

  const newTask = {
    id: tasks[username].length + 1,
    data: {
      description: description
    }
  };

  tasks[username].push(newTask);

  return res.status(201).json(newTask);
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
