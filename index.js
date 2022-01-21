require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

//connexion à la bdd
// mongoose.connect("mongodb://localhost/vinted");
mongoose.connect(process.env.MONGODB_URI);

//création du serveur
const app = express();
app.use(cors());
app.use(formidable());

app.get("/", (req, res) => {
  res.json("Welcome on Vinted API !");
});

//import des routes users et offers
const usersRoutes = require("./routes/users");
app.use(usersRoutes);
const offersRoutes = require("./routes/offers");
app.use(offersRoutes);

app.listen(4000, () => {
  console.log("Server has started !");
});
