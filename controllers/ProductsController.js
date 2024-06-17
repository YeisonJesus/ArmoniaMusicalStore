const Product = require("../models/Product");

class ProductsController {
  static getAllProducts(req, res) {
    Product.getAllProducts(req, (error, results) => {
      if (error) {
        console.error("Error retrieving products: ", error);
        res.status(500).json({ error: "Error retrieving products" });
        return;
      }

      res.json(results);
    });
  }

  static getProductById(req, res) {
    const id = req.params.id;

    Product.getProductById(id, (error, results) => {
      if (error) {
        console.error("Error retrieving product: ", error);
        res.status(500).json({ error: "Error retrieving product" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(results[0]);
    });
  }

  static createProduct(req, res) {
    const productData = req.body;
    const product = new Product(
      null,
      productData.name,
      productData.price,
      productData.category_id
    );

    product.create((error, results) => {
      if (error) {
        console.error("Error creating product: ", error);
        req.session.message = {
          type: "danger",
          message: "Error al crear producto.",
        };
        res.redirect("back");
      }

      product.id = results.insertId;

      req.session.message = {
        type: "success",
        message: "Producto creado con éxito.",
      };
      res.redirect("back");
    });
  }

  static updateProduct(req, res) {
    const id = req.params.id;
    const productData = req.body;
    const product = new Product(
      id,
      productData.name,
      productData.price,
      productData.category_id
    );

    product.update((error, results) => {
      if (error) {
        console.error("Error updating product: ", error);
        req.session.message = {
          type: "danger",
          message: "Error al actualizar el producto.",
        };
        res.redirect("back");
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Product not found" });
        req.session.message = {
          type: "danger",
          message: "Producto no encontrado.",
        };
        res.redirect("back");
      }

      req.session.message = {
        type: "success",
        message: "Producto actualizado exitosamente.",
      };
      res.redirect("back");
    });
  }

  static deleteProduct(req, res) {
    const id = req.params.id;

    Product.deleteProduct(id, (error, results) => {
      if (error) {
        console.error("Error deleting product: ", error);
        req.session.message = {
          type: "success",
          message: "Error al eliminar el producto",
        };
        res.redirect("back");
        return;
      }

      if (results.affectedRows === 0) {
        req.session.message = {
          type: "success",
          message: "Producto no encontrado",
        };
        res.redirect("back");
      }

      req.session.message = {
        type: "success",
        message: "Producto eliminado exitosamente",
      };
      res.redirect("back");
    });
  }

  static toggleCart(req, res) {
    if (isNaN(req.body.product_id)) {
      res.redirect("back");
    }

    const product_id = Number(req.body.product_id);
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;

    let cart = Array.isArray(req.session.cart) ? req.session.cart : [];
    const exists = cart.find((c) => c && c.id === product_id);

    if (exists) {
      cart = cart.filter((c) => c.id !== product_id);
    } else {
      cart.push({
        id: product_id,
        name: product_name,
        price: Number(product_price),
        quantity: 1,
      });
    }
    req.session.cart = cart;

    res.redirect("back");
  }

  static formFinalizePurchase(req, res) {
    const cartIds = Array.isArray(req.session.cart)
      ? req.session.cart.map((c) => c.id)
      : [];

    const cart = Array.isArray(req.session.cart) ? req.session.cart : [];

    const total = cart.reduce((accumulator, item) => {
      console.log({ price: item.price });
      return accumulator + (item.price || 0);
    }, 0);
    console.log({ total });
    res.render("finalize-purchase", {
      auth: req.session.user,
      cartIds,
      cart,
      total,
    });
  }
}

module.exports = ProductsController;
