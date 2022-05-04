const express = require("express");
const router = express.Router();
// const cloudinary = require("cloudinary").v2;

//import des modèles
const Order = require("../models/Order");
const User = require("../models/User");

//Je viens configurer cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

router.post("/new-order", async (req, res) => {
  try {
    console.log("req.fields", req.fields);

    // // Etape 1 - On réceptionne la liste des plats sélectionnés en format JSON
    // const JSONNewOrder = req.fields;

    // // Etape 2 - On transforme le format JSON en tableau d'objets
    // const arrayOfNewOrder = Object.keys(JSONNewOrder).map(function (cle) {
    //   return JSONNewOrder[cle];
    // });

    // console.log("newOrder", arrayOfNewOrder);

    // Etape 1- On récupère l'utilisateur connecté qui effectue la commande
    const user = await User.findOne({ token: req.fields.token });
    console.log("user", user);
    // Etape 2 - On crée la nouvelle commande

    const newOrder = new Order({
      restaurant: req.fields.restaurant,
      dishes: req.fields.order,
      price: Number(req.fields.price),
      owner: user,
    });

    await newOrder.save();

    // //Je rajoute mon utlisateur
    // newOrder.owner = req.user;
    // console.log("req.user", req.user);
    // await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/orders-history", async (req, res) => {
  console.log("token", req.query);

  try {
    // Etape 1 : on récupère l'id de l'utilisateur connecté
    const user = await User.findOne({
      token: req.query.token,
    });
    console.log("user", user._id);

    // Etape 2 : on filtre l'affichage des commandes avec l'id de l'utilisateur
    const historyOrders = await Order.find({ owner: user._id });

    res.json(historyOrders);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
