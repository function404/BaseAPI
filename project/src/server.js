/**
 * Aula Backend - 2025-03-17
 * Dev - Lincoln
 * 3° Fase - Análise e Desenvolvimento de Sistemas
 * Disciplina - Desenvolvimento Back-end 
 */

const express = require('express');

const UserController = require('./controllers/userController');
const ProjectController = require('./controllers/projectController');
const TaskController = require('./controllers/taskController');

const app = express();
app.use(express.json());

const port = 3001;

app.post('/users', UserController.createUsers);
app.get('/users', UserController.getUsers);
app.put('/users/:id', UserController.updateUsers);
app.delete('/users/:id', UserController.deleteUsers);

app.post('/projects', ProjectController.createProject);
app.get('/projects', ProjectController.getProject);
app.put('/projects/:id', ProjectController.updateProject);
app.delete('/projects/:id', ProjectController.deleteProject);

app.post('/tasks', TaskController.createTasks);
app.get('/tasks', TaskController.getTasks);
app.put('/tasks/:id', TaskController.updateTasks);
app.delete('/tasks/:id', TaskController.deleteTasks);

app.listen(Number(port), () => 
    console.log(`🚀 Servidor rodando na porta ${port}`)
);
