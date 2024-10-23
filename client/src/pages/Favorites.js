import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import FavoritesList from "../components/FavoritesList";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5001/api/favorites");
      setFavorites(response.data);
    } catch (err) {
      setError("Failed to fetch favorites. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (article) => {
    try {
      await axios.delete(`http://localhost:5001/api/favorites/${article.id}`);
      fetchFavorites();
    } catch (err) {
      alert("Failed to remove from favorites.");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Favorite Articles
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "40px auto" }} />
      ) : (
        <FavoritesList favorites={favorites} onRemove={handleRemove} />
      )}
    </Container>
  );
};

export default Favorites;
