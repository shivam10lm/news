const axios = require("axios");

const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEWS_API_KEY,
    pageSize: 12,
  },
});

const searchNews = async (
  query = "technology",
  page = 1,
  pageSize = 12,
  language = "en"
) => {
  try {
    console.log("Making API call with:", { query, page, pageSize, language }); // Add this log
    const response = await newsApiClient.get("/everything", {
      params: {
        q: query,
        language,
        page,
        pageSize,
      },
    });
    console.log("API Response:", response.data); // Add this log
    return response.data;
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  searchNews,
};
