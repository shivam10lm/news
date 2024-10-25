import React from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { NewsList } from "../components";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites, fetchFavorites } = useFavorites();

  const handleFavorite = async (article) => {
    try {
      await axios.delete(`http://localhost:5001/api/favorites/${article.id}`);
      fetchFavorites(); // Refresh the favorites list after removing
    } catch (err) {
      console.error("Failed to remove from favorites");
    }
  };

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Favorite Articles
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No favorite articles yet.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Favorite Articles
      </Typography>

      <NewsList
        articles={favorites}
        favorites={favorites} // Pass the same array as both articles and favorites
        onFavorite={handleFavorite}
      />
    </Container>
  );
};

export default Favorites;
