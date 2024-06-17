const db = require("../db");
const bcrypt = require("bcrypt");

class User {
  constructor(id, username, password, rol = "client") {
    this.id = id;
    this.username = username;
    this.password = password;
    this.rol = rol;
  }

  static getAllUsers(callback) {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  }

  static getUserById(id, callback) {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
  }

  static getUserByUsername(username, callback) {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], callback);
  }

  create(callback) {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    console.log({ hashedPassword, password: this.password });

    // Crear el usuario en la base de datos
    db.query(
      "INSERT INTO users (username, password, rol) VALUES (?, ?, ?)",
      [this.username, hashedPassword, this.rol],
      callback
    );
  }// $2b$10$VhJqbvzUq4dFzZLX1x6WgO18Ki/QV0LvG2S.cX

  update(callback) {
    const query = "UPDATE users SET ? WHERE id = ?";
    db.query(query, [this, this.id], callback);
  }

  static deleteUser(id, callback) {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], callback);
  }
}

module.exports = User;
