const newsService = require("../services/newsService");

const searchNews = async (req, res, next) => {
  try {
    const {
      q = "technology",
      page = 1,
      pageSize = 12,
      language = "en",
    } = req.query;

    const data = await newsService.searchNews(q, page, pageSize, language);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchNews,
};
