const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

router.get("/", favoriteController.getFavorites);
router.post("/", favoriteController.addFavorite);
router.delete("/:id", favoriteController.removeFavorite);

module.exports = router;
