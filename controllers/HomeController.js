const Product = require("../models/Product");
const Category = require("../models/Category");

class HomeController {
  static index(req, res) {
    Product.getAllProducts(req, (error, results) => {
      if (error) {
        console.error("Error retrieving products: ", error);
        res.status(500).json({ error: "Error retrieving products" });
        return;
      }

      const cartIds = Array.isArray(req.session.cart)
        ? req.session.cart.map((c) => c.id)
        : [];

      const cart = Array.isArray(req.session.cart) ? req.session.cart : [];

      const favoritesIds = Array.isArray(req.session.favorites)
        ? req.session.favorites.map((c) => c.id)
        : [];

      const favorites = Array.isArray(req.session.favorites)
        ? req.session.favorites
        : [];

      res.render("index", {
        products: results,
        auth: req.session.user,
        cartIds,
        cart,
        favoritesIds,
        favorites,
      });
    });
  }

  static dashboard(req, res) {
    res.render("dashboard/index", { auth: req.session.user });
  }

  static products(req, res) {
    Product.getAllProducts(req, (error, results) => {
      if (error) {
        console.error("Error retrieving products: ", error);
        res.status(500).json({ error: "Error retrieving products" });
        return;
      }

      const message = req.session.message?.message;
      const type = req.session.message?.type;
      req.session.message = null;
      res.render("dashboard/products", {
        products: results,
        auth: req.session.user,
        message,
        type,
      });
    });
  }

  static productsCreate(req, res) {
    Category.getAllCategories((error, results) => {
      if (error) {
        console.error("Error retrieving categories: ", error);
        res.status(500).json({ error: "Error retrieving categories" });
        return;
      }

      const message = req.session.message?.message;
      const type = req.session.message?.type;
      req.session.message = null;
      res.render("dashboard/products-create", {
        categories: results,
        auth: req.session.user,
        message,
        type,
      });
    });
  }

  static productsUpdate(req, res) {
    const id = req.params.id;

    Product.getProductById(id, (error, product) => {
      if (error) {
        console.error("Error retrieving product: ", error);
        res.status(500).json({ error: "Error retrieving product" });
        return;
      }

      if (product.length === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      Category.getAllCategories((error, results) => {
        if (error) {
          console.error("Error retrieving categories: ", error);
          res.status(500).json({ error: "Error retrieving categories" });
          return;
        }

        const message = req.session.message?.message;
        const type = req.session.message?.type;
        req.session.message = null;
        res.render("dashboard/products-edit", {
          categories: results,
          product: product[0],
          auth: req.session.user,
          message,
          type,
        });
      });
    });
  }

  static favorites(req, res) {
    const favoritesIds = Array.isArray(req.session.favorites)
      ? req.session.favorites.map((c) => c.id)
      : [];

    const favorites = Array.isArray(req.session.favorites)
      ? req.session.favorites
      : [];

    res.render("dashboard/favorites", {
      favoritesIds,
      favorites,
    });
  }
}

module.exports = HomeController;
