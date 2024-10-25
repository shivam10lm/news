import React from "react";
import { Container, Typography } from "@mui/material";
import { FavoritesList } from "../components";
import { useFavorites } from "../hooks/useFavorites";
import api from "../utils/api";

const Favorites = () => {
  const { favorites, fetchFavorites } = useFavorites();

  const handleRemove = async (article) => {
    try {
      await api.delete(`/favorites/${article.id}`);
      fetchFavorites(); // Refresh the favorites list after removing
    } catch (err) {
      console.error("Failed to remove from favorites");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Favorite Articles
      </Typography>

      <FavoritesList favorites={favorites} onRemove={handleRemove} />
    </Container>
  );
};

export default Favorites;
