import { useState, useEffect, useRef } from "react";
import api from "../utils/api";

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const hasFetchedInitially = useRef(false);

  const fetchNewsData = async (query = searchQuery, pageNum = page) => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = `/news/search?q=${
        query || "general"
      }&page=${pageNum}&pageSize=20`;
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
  };

  useEffect(() => {
    if (hasFetchedInitially.current) {
      fetchNewsData();
    } else {
      hasFetchedInitially.current = true;
    }
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
