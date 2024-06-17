const db = require("../db");

class Product {
  constructor(id, name, price, category_id) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category_id = category_id;
  }

  static getAllProducts(req, callback) {
    const { search } = req.query;

    let query =
      "SELECT products.*, categories.name AS category_name " +
      "FROM products " +
      "JOIN categories ON products.category_id = categories.id";

    if (search) {
      const searchKeyword = `%${search}%`;
      query += " WHERE products.name LIKE ? OR categories.name LIKE ?";
      query += " ORDER BY products.id DESC";
      db.query(query, [searchKeyword, searchKeyword], callback);
    } else {
      query += " ORDER BY products.id DESC";
      db.query(query, callback);
    }
  }

  static getProductById(id, callback) {
    const query =
      "SELECT products.*, categories.name AS category_name " +
      "FROM products " +
      "JOIN categories ON products.category_id = categories.id " +
      "WHERE products.id = ?";
    db.query(query, [id], callback);
  }

  create(callback) {
    const query = "INSERT INTO products SET ?";
    db.query(query, [this], callback);
  }

  update(callback) {
    const query = "UPDATE products SET ? WHERE id = ?";
    db.query(query, [this, this.id], callback);
  }

  static deleteProduct(id, callback) {
    const query = "DELETE FROM products WHERE id = ?";
    db.query(query, [id], callback);
  }
}

module.exports = Product;
