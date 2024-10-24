const favoriteService = require("../services/favoriteService");

// Get all favorites
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.fetchFavorites(); // Fetch favorites using the service
    res.status(200).json(favorites); // Return a 200 status code explicitly
  } catch (error) {
    console.error("Error fetching favorites:", error);
    next(error);
  }
};

// Add a favorite
const addFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.saveFavorite(req.body); // Save favorite using the service
    res.status(201).json({
      message: "Added to favorites",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
    next(error);
  }
};

// Remove a favorite
const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params; // Destructure for clarity
    await favoriteService.deleteFavorite(id); // Delete favorite using the service
    res.status(204).send(); // Use 204 No Content for successful deletion
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
