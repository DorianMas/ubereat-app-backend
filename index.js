require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

//connexion à la bdd
mongoose.connect(process.env.MONGODB_URI);

//création du serveur
const app = express();
app.use(cors());
app.use(formidable());

app.get("/", (req, res) => {
  res.json("Welcome on Ubereat API !");
});

app.get("/test", (req, res) => {
  res.json("Test successful");
});

//import des routes users et orders
const usersRoutes = require("./routes/users");
app.use(usersRoutes);
const ordersRoutes = require("./routes/orders");
app.use(ordersRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
