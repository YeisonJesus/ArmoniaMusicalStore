const db = require("../db");

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static getAllCategories(callback) {
    console.log("getAllCategories");
    const query = "SELECT * FROM categories";
    db.query(query, callback);
  }
}

module.exports = Category;
