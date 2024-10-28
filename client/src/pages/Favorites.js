import React from "react";
import { Container, Typography } from "@mui/material";
import { FavoritesList } from "../components";
import { useNewsContext } from "../contexts/NewsContext";

const Favorites = () => {
  const { favorites, handleFavorite } = useNewsContext();

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
