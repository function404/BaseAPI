const alunos = [
   {
      id: 1,
      nome: 'João',
      idade: 20
   },
   {
      id: 2,
      nome: 'Maria',
      idade: 20
   },
]

class Aluno {
   constructor(id, nome, idades) {
      this.id = id
      this.nome = nome
      this.idades = idades
   }

   save() {
      alunos.push(this)
   }

   static fetchAll() {
      return alunos
   }
}

module.exports = Aluno