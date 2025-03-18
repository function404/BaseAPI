let users = [
   {
      id: 1,
      name: "Lincoln",
      email: "lincoln@gmail.com",
      password: "asdsad"
   },
   {
      id: 2,
      name: "Felipe",
      email: "felipe@gmail.com",
      password: "asdsad"
   }
];

class User {
   constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
   }

   static fetchUsers() {
      return users
   }
}

module.exports = User;
