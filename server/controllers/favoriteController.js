const favoriteService = require("../services/favoriteService");

const addFavorite = async (req, res, next) => {
  try {
    // First check if article already exists
    const existingFavorite = await favoriteService.checkExistingFavorite(
      req.body.title
    );

    if (existingFavorite) {
      return res.status(409).json({
        message: "Article already in favorites",
      });
    }

    // If not exists, add it
    const result = await favoriteService.saveFavorite(req.body);
    if (result && result.insertId) {
      res.status(201).json({
        message: "Added to favorites",
        id: result.insertId,
      });
    } else {
      throw new Error("Failed to add favorite");
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
    next(error);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
