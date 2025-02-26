/**
 * Aula Backend - 2025-02-24
 * Dev - Lincoln
 * 3° Fase - Análise e Desenvolvimento de Sistemas
 * Disciplina - Desenvolvimento Back-end 
*/
/**
 * Módulo nativo do Node.js para criar servidores HTTP
*/
const express = require('express'), { json } = express;

/**
 * Servidor Express
*/
const app = express();
/**
 * Middleware para tratar requisições com corpo em JSON
*/
app.use(json());

/**
 * Classe Aluno
 * @class
 * @property {number} id - ID do aluno
 * @property {string} nome - Nome do aluno
 * @property {number} idade - Idade do aluno
 * @constructor
 * @param {number} id - ID do aluno
 * @param {string} nome - Nome do aluno
 * @param {number} idade - Idade do aluno
 * @returns {object} - Aluno criado
*/
class Aluno {
   constructor(nome, idade) {
      this.nome = nome;
      this.idade = idade;
   }
}

/**
 * Lista de alunos
 * @type {array}
 * @property {number} id - ID do aluno
 * @property {string} nome - Nome do aluno
 * @property {number} idade - Idade do aluno
 * @property {array} alunos - Lista de alunos
*/
const alunos = [
   new Aluno('João', 10),
   new Aluno('Maria', 15),
]

/**
 * Classe Curso
 * @class
 * @property {number} id - ID do curso
 * @property {string} nome - Nome do curso
 * @property {number} ch - Carga horária do curso
 * @property {array} alunos - Lista de alunos do curso
 * @constructor
 * @param {number} id - ID do curso
 * @param {string} nome - Nome do curso
 * @param {number} ch - Carga horária do curso
 * @param {array} alunos - Lista de alunos do curso
 * @returns {object} - Curso criado
*/
class Curso {
   constructor(nome, ch) {
      this.nome = nome;
      this.ch = ch;
   }
}

/**
 * Lista de cursos
 * @type {array}
 * @property {number} id - ID do curso
 * @property {string} nome - Nome do curso
 * @property {number} ch - Carga horária do curso
 * @property {array} alunos - Lista de alunos do curso
*/
const cursos = [
   new Curso('ADS', 76),
   new Curso('ADM', 45),
]

/**
 * Porta do servidor
 * @type {number}
*/
const port = 3000;

/**
 * Rota inicial
 * @returns {string} - Mensagem de boas-vindas
*/
app.get('/', (req, res) => {
   res.status(200).send('Hello, world!');
});


/**
 * Criar um aluno
 * @param {string} nome - Nome do aluno
 * @param {number} idade - Idade do aluno
 * @returns {object} - Aluno criado
*/
app.post('/alunos', (req, res) => {
   const { nome, idade } = req.body;
   
   const aluno = new Aluno(nome, idade);
   
   alunos.push(aluno);
   res.status(201).json(aluno);
});

/**
 * Listar todos os alunos
 * @returns {array} - Lista de alunos
*/
app.get('/alunos', (req, res) => {
   res.status(200).json(alunos);
})

/**
 * Atualizar um aluno
 * @param {string} id - ID do aluno
 * @param {string} nome - Nome do aluno
 * @param {number} idade - Idade do aluno
 * @returns {object} - Aluno atualizado
*/
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

/**
 * Deletar um aluno
 * @param {string} id - ID do aluno
 * @returns {void} - Alunos deletado
*/
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

/**
 * Criar um curso
 * @param {string} nome - Nome do curso
 * @param {number} ch - Carga horária do curso
 * @param {array} alunos - Lista de alunos do curso
 * @returns {object} - Curso criado
*/
app.post('/cursos', (req, res) => {
   const { nome, ch } = req.body;
   
   const curso = new Curso(nome, ch);
   
   cursos.push(curso);
   res.status(201).json(curso);
});

/**
 * Listar todos os cursos
 * @returns {array} - Lista de cursos
*/
app.get('/cursos', (req, res) => {
   res.status(200).json(cursos);
});

/**
 * Atualizar um curso
 * @param {string} id - ID do curso
 * @param {string} nome - Nome do curso
 * @param {number} ch - Carga horária do curso
 * @param {array} alunos - Lista de alunos do curso
 * @returns {object} - Curso atualizado
*/
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

/** 
 * Deletar um curso
 * @param {string} id - ID do curso
 * @returns {void} - Curso deletado
*/
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

/**
 * Iniciar o servidor
 * @returns {void} 
 * @param {number} port - Porta do servidor
*/
app.listen(Number(port), () =>
   console.log(`🚀 Servidor rodando na porta ${port}`)
);