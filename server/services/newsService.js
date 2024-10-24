const axios = require("axios");

const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEWS_API_KEY,
    pageSize: 10,
  },
});

const searchNews = async (query = "technology", page = 1, language = "en") => {
  try {
    const response = await newsApiClient.get("/everything", {
      params: { q: query, language, page },
    });
    return response.data;
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    throw error;
  }
};

const getNewsByCategory = async (
  category = "general",
  page = 1,
  country = "us"
) => {
  try {
    const response = await newsApiClient.get("/top-headlines", {
      params: { category, country, page },
    });
    return response.data;
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  searchNews,
  getNewsByCategory,
};
