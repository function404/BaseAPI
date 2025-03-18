/**
 * Aula Backend - 2025-02-24
 * Dev - Lincoln
 * 3° Fase - Análise e Desenvolvimento de Sistemas
 * Disciplina - Desenvolvimento Back-end 
*/
const express = require('express'), { json } = express;

const app = express();

app.use(json());

class Aluno {
   constructor(nome, idade) {
      this.nome = nome;
      this.idade = idade;
   }
}

const alunos = [
   new Aluno('João', 10),
   new Aluno('Maria', 15),
]

class Curso {
   constructor(nome, ch) {
      this.nome = nome;
      this.ch = ch;
   }
}

const cursos = [
   new Curso('ADS', 76),
   new Curso('ADM', 45),
]

const port = 3000;

app.get('/', (req, res) => {
   res.status(200).send('Hello, world!');
});

app.post('/alunos', (req, res) => {
   const { nome, idade } = req.body;
   
   const aluno = new Aluno(nome, idade);
   
   alunos.push(aluno);
   res.status(201).json(aluno);
});

app.get('/alunos', (req, res) => {
   res.status(200).json(alunos);
})

app.put('/alunos/:id', (req, res) => {
   const { id } = req.params;
   const { nome, idade } = req.body;

   const aluno = alunos[id];
   aluno.id = id;
   aluno.nome = nome;
   aluno.idade = idade;

   if (!aluno) {
      res.status(404).send('Aluno não encontrado');
   }

   res.status(200).json(aluno);
});

app.delete('/alunos/:id', (req, res) => {
   const { id } = req.params;
   const index = alunos.findIndex(aluno => aluno.id === id);

   const aluno = alunos[id];
   alunos.splice(id, 1);

   if (!aluno) {
      res.status(404).send('Aluno não encontrado');
   }

   alunos.splice(index, 1);
   res.status(204).send();
});

app.post('/cursos', (req, res) => {
   const { nome, ch } = req.body;
   
   const curso = new Curso(nome, ch);
   
   cursos.push(curso);
   res.status(201).json(curso);
});

app.get('/cursos', (req, res) => {
   res.status(200).json(cursos);
});

app.put('/cursos/:id', (req, res) => {
   const { id } = req.params;
   const { nome, ch } = req.body;

   const curso = cursos[id];
   curso.id = id;
   curso.nome = nome;
   curso.ch = ch;

   if (!curso) {
      res.status(404).send('Curso não encontrado');
   }

   res.status(200).json(curso);
});

app.delete('/cursos/:id', (req, res) => {
   const { id } = req.params;
   const index = cursos.findIndex(curso => curso.id === id);

   const curso = cursos[id];
   cursos.splice(id, 1);

   if (!curso) {
      res.status(404).send('Curso não encontrado');
   }

   cursos.splice(index, 1);
   res.status(204).send();
});

app.listen(Number(port), () =>
   console.log(`🚀 Servidor rodando na porta ${port}`)
);