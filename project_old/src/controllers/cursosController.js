const Curso = require('../models/cursos')

class CursoController {
   static post(req, res) {
      const { id, nome, ch } = req.body

      const curso = new Curso(id, nome, ch)
      curso.save()

      res.status(201).json(curso)
   }

   static get(req, res) {
      const cursos = Curso.fetchAll()

      res.json(cursos)
   }

   static put(req, res) {
      const { id } = req.params
      const { nome, ch } = req.body

      const curso = Curso.fetchAll().find(curso => curso.id == id)
      curso.nome = nome
      curso.ch = ch

      if (!curso) {
         res.status(404).send('Curso não encontrado')
      }

      res.status(200).json(curso)
   }

   static delete(req, res) {
      const { id } = req.params;
      const cursosArray = Curso.fetchAll();
      const index = cursosArray.findIndex(curso => curso.id == id);

      if (index === -1) {
         return res.status(404).send('Curso não encontrado');
      }

      cursosArray.splice(index, 1);
      res.status(200).send('Curso deletado com sucesso');
   }
}
module.exports = CursoController