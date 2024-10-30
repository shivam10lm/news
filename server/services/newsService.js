const axios = require("axios");

const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEWS_API_KEY,
  },
});

const searchNews = async (
  query = "general",
  page = 1,
  pageSize = 12,
  language = "en"
) => {
  try {
    const response = await newsApiClient.get("/everything", {
      params: {
        q: query,
        language,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  searchNews,
};
