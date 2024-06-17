const express = require("express");
const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const config = require("./config");

const port = 3030;

const app = express();
// Configuración de express-session
app.use(session(config.session));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
