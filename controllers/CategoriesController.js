const Category = require('../models/Category');

class CategoriesController {
  static getAllCategories(req, res) {
    Category.getAllCategories((error, results) => {
      if (error) {
        console.error('Error retrieving categories: ', error);
        res.status(500).json({ error: 'Error retrieving categories' });
        return;
      }

      res.json(results);
    });
  }
}

module.exports = CategoriesController;