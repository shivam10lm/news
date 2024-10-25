import { useState, useEffect } from "react";
import axios from "axios";

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = `http://localhost:5001/api/news/search?q=${
        searchQuery || "general"
      }&page=${page}&pageSize=20`; // Request more articles than needed
      console.log("Fetching from:", endpoint);

      const response = await axios.get(endpoint);

      // Filter articles
      const filteredArticles = response.data.articles.filter(
        (article) =>
          article.title &&
          article.description &&
          article.urlToImage &&
          article.content &&
          article.content !== "[Removed]" &&
          article.description.length > 0 &&
          article.content.length > 0
      );

      // Take only the first 12 articles
      const first12Articles = filteredArticles.slice(0, 12);

      setArticles(first12Articles);
      setTotalPages(Math.min(Math.ceil(response.data.totalResults / 12), 5));
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to fetch news articles. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return {
    articles,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleSearch,
  };
};
