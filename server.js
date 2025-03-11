/**
 * Aula Backend - 2025-03-11
 * Dev - Lincoln
 * 3° Fase - Análise e Desenvolvimento de Sistemas
 * Disciplina - Desenvolvimento Back-end 
*/
const express = require('express')

const CursoController = require('./src/controllers/cursosController')
const AlunoController = require('./src/controllers/alunosController')

const app = express()
app.use(express.json())

const port = 3000

app.post('/alunos', AlunoController.post)
app.get('/alunos', AlunoController.get)
app.put('/alunos/:id', AlunoController.put)
app.delete('/alunos/:id', AlunoController.delete)

app.post('/cursos', CursoController.post)
app.get('/cursos', CursoController.get)
app.put('/cursos/:id', CursoController.put)
app.delete('/cursos/:id', CursoController.delete)


app.listen(Number(port), () =>
   console.log(`🚀 Servidor rodando na porta ${port}`)
);