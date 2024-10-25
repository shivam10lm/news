const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../models/favoriteModel");

const fetchFavorites = async () => {
  return await getFavorites();
};

const saveFavorite = async (articleData) => {
  return await addFavorite(articleData);
};

const deleteFavorite = async (id) => {
  return await removeFavorite(id);
};

module.exports = {
  fetchFavorites, // Make sure these names match with what you're calling in controller
  saveFavorite,
  deleteFavorite,
};
