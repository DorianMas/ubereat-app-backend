const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//import du modèle User
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  console.log(req.fields);

  try {
    //On véirifie que l'email en base de données soit bien disponible
    const isUserExist = await User.findOne({ email: req.fields.email });
    if (isUserExist !== null) {
      res.status(400).json({ message: "This email already has an account" });
    } else {
      //Etape 1 : hasher le mot de passe
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const token = uid2(64);
      //   console.log("salt==>", salt);
      //   console.log("hash==>", hash);

      //Etape 2 : créer le nouvel utilisateur
      const newUser = new User({
        email: req.fields.email,
        token: token,
        hash: hash,
        salt: salt,
      });

      // Etape 3 : sauvegarder ce nouvel utilisateur dans la bdd
      await newUser.save();
      res.json({
        _id: newUser._id,
        email: newUser.email,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  console.log(req.fields);

  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user === null) {
      res.status(401).json({ message: "Unauthorized ! 1" });
    } else {
      console.log(user.hash, "hash à comparer");
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );
      console.log(newHash, "Mon nouveau hash");

      if (user.hash === newHash) {
        res.json({
          _id: user._id,
          token: user.token,
        });
      } else {
        res.status(401).json({ message: "Unauthorized ! 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
