const favoriteService = require("../services/favoriteService");

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.fetchFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.saveFavorite(req.body);
    res.status(201).json({
      message: "Added to favorites",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    await favoriteService.deleteFavorite(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing favorite:", error);
    next(error);
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
