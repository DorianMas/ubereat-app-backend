require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

//connexion à la bdd
mongoose.connect("mongodb://localhost/ubereat");
// mongoose.connect(process.env.MONGODB_URI);

//création du serveur
const app = express();
app.use(cors());
app.use(formidable());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.json("Welcome on Ubereat API !");
});

app.get("/test", (req, res) => {
  res.json("Test successful");
});

//import des routes users et offers
const usersRoutes = require("./routes/users");
app.use(usersRoutes);
const ordersRoutes = require("./routes/orders");
app.use(ordersRoutes);

app.listen(4000, () => {
  console.log("Server has started !");
});
