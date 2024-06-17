const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthenticatedController {
  static formCreate(req, res) {
    const cartIds = Array.isArray(req.session.cart)
      ? req.session.cart.map((c) => c.id)
      : [];

    const cart = Array.isArray(req.session.cart) ? req.session.cart : [];
    res.render("auth/create", { auth: req.session.user, cartIds, cart });
  }

  static createUser(req, res) {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render("auth/create", {
        message: "Las contraseñas no coinciden",
        type: "danger",
      });
    }

    const user = new User(null, username, password, "client");

    User.getUserByUsername(user.username, (error, results) => {
      if (error) {
        console.error("Error al recuperar usuario: ", error);
        return res.status(500).render("auth/create", {
          message: "Error al recuperar usuario",
          type: "danger",
        });
      }

      if (results.length > 0) {
        return res.status(400).render("auth/create", {
          message: "Nombre de usuario ya existe",
          type: "danger",
        });
      }

      user.create((error, results) => {
        if (error) {
          console.error("Error al crear usuario: ", error);
          return res.status(500).render("auth/create", {
            message: "Error al crear usuario",
            type: "danger",
          });
        }

        user.id = results.insertId;

        req.session.user = {
          id: user.id,
          username: user.username,
          rol: user.rol,
        };

        res.redirect("/");
      });
    });
  }

  static formLogin(req, res) {
    const cartIds = Array.isArray(req.session.cart)
      ? req.session.cart.map((c) => c.id)
      : [];

    const cart = Array.isArray(req.session.cart) ? req.session.cart : [];
    res.render("auth/login", { auth: req.session.user, cartIds, cart });
  }

  static async login(req, res) {
    const { username, password } = req.body;

    User.getUserByUsername(username, (error, results) => {
      if (error) {
        console.error("Error al iniciar sesión: ", error);
        return res.status(500).render("auth/login", {
          message: "Error al iniciar sesión",
          type: "danger",
        });
      }

      if (results.length <= 0) {
        return res.status(401).render("auth/login", {
          message: "Usuario o contraseña invalido",
          type: "danger",
        });
      }

      const user = results[0];

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(401).render("auth/login", {
          message: "Usuario o contraseña invalido",
          type: "danger",
        });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        rol: user.rol,
      };

      res.redirect("/");
    });
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect("/auth/login");
  }
}

module.exports = AuthenticatedController;
