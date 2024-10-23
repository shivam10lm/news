import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import NewsList from "../components/NewsList";

const Home = () => {
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
      const endpoint = searchQuery
        ? `http://localhost:5001/api/news/search?q=${searchQuery}&page=${page}`
        : `http://localhost:5001/api/news/categories?category=general&page=${page}`;

      const response = await axios.get(endpoint);
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
      localStorage.setItem(
        "currentArticles",
        JSON.stringify(response.data.articles)
      );
    } catch (err) {
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

  const handleFavorite = async (article) => {
    try {
      await axios.post("http://localhost:5001/api/favorites", article);
      alert("Added to favorites!");
    } catch (err) {
      alert("Failed to add to favorites.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "40px auto" }} />
      ) : (
        <>
          <NewsList
            articles={articles}
            onFavorite={handleFavorite}
            isFavorites={false}
          />

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
