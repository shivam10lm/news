import React from "react";
import { Container, Typography } from "@mui/material";
import { FavoritesList } from "../components";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites, handleFavorite } = useFavorites();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Favorite Articles
      </Typography>

      <FavoritesList favorites={favorites} onRemove={handleFavorite} />
    </Container>
  );
};

export default Favorites;
