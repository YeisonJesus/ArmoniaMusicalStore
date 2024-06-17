module.exports = {
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "tienda",
  },
  session: {
    secret: "base64:5xGy5SSIOdOmNn69gzofJM/xnT74KeBjIa9Gd+qzw0c=", // Clave secreta para firmar las cookies de sesión
    resave: false,
    saveUninitialized: true
  },
};
