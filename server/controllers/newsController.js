const newsService = require("../services/newsService");

const searchNews = async (req, res, next) => {
  try {
    const { q = "technology", page = 1, language = "en" } = req.query;
    const data = await newsService.searchNews(q, page, language);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getNewsByCategory = async (req, res, next) => {
  try {
    const { category = "general", page = 1, country = "us" } = req.query;
    const data = await newsService.getNewsByCategory(category, page, country);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchNews,
  getNewsByCategory,
};
