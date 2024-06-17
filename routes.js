const express = require("express");
const ProductsController = require("./controllers/ProductsController");
const CategoriesController = require("./controllers/CategoriesController");
const UsersController = require("./controllers/UsersController");

const HomeController = require("./controllers/HomeController");
const AuthenticatedController = require("./controllers/AuthenticatedController");

const verifyAuthenticationMiddleware = require("./middleware/verifyAuthenticationMiddleware");
const noAuthenticationMiddleware = require("./middleware/noAuthenticationMiddleware");

const router = express.Router();

router.get("/", HomeController.index);
router.get("/dashboard", verifyAuthenticationMiddleware, HomeController.dashboard);
router.get("/dashboard/products", verifyAuthenticationMiddleware, HomeController.products);
router.get("/dashboard/products/create", verifyAuthenticationMiddleware, HomeController.productsCreate);
router.post("/dashboard/products/create", verifyAuthenticationMiddleware, ProductsController.createProduct);
router.get("/dashboard/products/edit/:id", verifyAuthenticationMiddleware, HomeController.productsUpdate);
router.post("/dashboard/products/edit/:id", verifyAuthenticationMiddleware, ProductsController.updateProduct);
router.post("/dashboard/products/delete/:id", verifyAuthenticationMiddleware, ProductsController.deleteProduct);

router.get("/auth/create", noAuthenticationMiddleware,  AuthenticatedController.formCreate);
router.post("/auth/create", noAuthenticationMiddleware, AuthenticatedController.createUser);

router.get("/auth/login", noAuthenticationMiddleware, AuthenticatedController.formLogin);
router.post("/auth/login", noAuthenticationMiddleware, AuthenticatedController.login);

router.post("/auth/logout", verifyAuthenticationMiddleware, AuthenticatedController.logout);

router.post("/toggle-cart", ProductsController.toggleCart);
router.get("/finalize-purchase", verifyAuthenticationMiddleware, ProductsController.formFinalizePurchase);

router.get("/api/products", ProductsController.getAllProducts);
router.get("/api/products/:id", ProductsController.getProductById);
router.post("/api/products", ProductsController.createProduct);
router.put("/api/products/:id", ProductsController.updateProduct);
router.delete("/api/products/:id", ProductsController.deleteProduct);

router.get("/api/categories", CategoriesController.getAllCategories);

router.get("/api/users", UsersController.getAllUsers);
router.get("/api/users/:id", UsersController.getUserById);

module.exports = router;
