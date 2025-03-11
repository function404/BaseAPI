const Aluno = require('../models/alunos')

class AlunoController {
   static post(req, res) {
      const { id, nome, idade } = req.body

      const aluno = new Aluno(id, nome, idade)
      aluno.save()

      res.status(201).json(aluno)
   }

   static get(req, res) {
      const alunos = Aluno.fetchAll()

      res.json(alunos)
   }

   static put(req, res) {
      const { id } = req.params
      const { nome, idade } = req.body

      const aluno = Aluno.fetchAll().find(aluno => aluno.id == id)
      aluno.nome = nome
      aluno.idade = idade

      if (!aluno) {
         res.status(404).send('Aluno não encontrado')
      }

      res.status(200).json(aluno)
   }

   static delete(req, res) {
      const { id } = req.params
      const alunosArray = Aluno.fetchAll()
      const index = alunosArray.findIndex(aluno => aluno.id == id)
   
      if (index === -1) {
         return res.status(404).send('Aluno não encontrado')
      }
   
      alunosArray.splice(index, 1)
      res.status(200).send('Aluno deletado com sucesso')
   }
}
module.exports = AlunoController