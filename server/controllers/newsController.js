const newsService = require("../services/newsService");

const searchNews = async (req, res, next) => {
  try {
    const {
      q = "technology",
      page = 1,
      pageSize = 12,
      language = "en",
    } = req.query;

    console.log("Controller received query:", { q, page, pageSize, language }); // Add this log

    const data = await newsService.searchNews(q, page, pageSize, language);
    res.json(data);
  } catch (error) {
    console.error("Controller error:", error); // Add this log
    next(error);
  }
};

module.exports = {
  searchNews,
};
