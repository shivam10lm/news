import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = useCallback(async () => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true);
    setError(null);

    try {
      const endpoint = `/news/search?q=${
        searchQuery || "general"
      }&page=${page}&pageSize=20`;
      const response = await api.get(endpoint);

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

      const first12Articles = filteredArticles.slice(0, 12);
      setArticles(first12Articles);
      setTotalPages(5);
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to fetch news articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]); // Remove loading from dependencies

  useEffect(() => {
    fetchNews();
  }, [page, searchQuery]); // Depend directly on page and searchQuery instead of fetchNews

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1);
  }, []); // Memoize handleSearch

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
