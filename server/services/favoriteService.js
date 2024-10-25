const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../models/favoriteModel");

const checkExistingFavorite = async (title) => {
  const favorites = await getFavorites();
  return favorites.some((fav) => fav.title === title);
};

const saveFavorite = async (articleData) => {
  // Make sure all required fields are present
  const {
    title,
    description = "",
    url = "",
    urlToImage = "",
    publishedAt = "",
    source = {},
  } = articleData;

  const favoriteData = {
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    sourceId: source.id || "",
    sourceName: source.name || "",
  };

  return await addFavorite(favoriteData);
};

module.exports = {
  getFavorites,
  saveFavorite,
  checkExistingFavorite,
  removeFavorite,
};
