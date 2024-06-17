const User = require("../models/User");

class UsersController {
  static getAllUsers(req, res) {
    User.getAllUsers((error, results) => {
      if (error) {
        console.error("Error retrieving users: ", error);
        res.status(500).json({ error: "Error retrieving users" });
        return;
      }

      res.json(results);
    });
  }

  static getUserById(req, res) {
    const id = req.params.id;

    User.getUserById(id, (error, results) => {
      if (error) {
        console.error("Error retrieving user: ", error);
        res.status(500).json({ error: "Error retrieving user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    });
  }

  static createUser(req, res) {
    const userData = req.body;
    const user = new User(
      null,
      userData.username,
      userData.password,
      userData.rol
    );

    User.getUserByUsername(user.username, (error, results) => {
      if (error) {
        console.error("Error retrieving user: ", error);
        res.status(500).json({ error: "Error retrieving user" });
        return;
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      user.create((error, results) => {
        if (error) {
          console.error("Error creating user: ", error);
          res.status(500).json({ error: "Error creating user" });
          return;
        }

        user.id = results.insertId;

        res.status(201).json(user);
      });
    });
  }
}

module.exports = UsersController;
