const cursos = [
   { 
      id: 1, 
      nome: 'INFO', 
      ch: 120
   },
   { 
      id: 2, 
      nome: 'ADM', 
      ch: 100 
   },
]

class Curso {
   constructor(id, nome, ch) {
      this.id = id
      this.nome = nome
      this.ch = ch
   }

   save() {
      cursos.push(this)
   }

   static fetchAll() {
      return cursos
   }
}

module.exports = Curso