import React from "react";
import { Typography, Box } from "@mui/material";
import NewsList from "./NewsList";

const FavoritesList = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No favorite articles yet.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Start adding some favorites from the home page!
        </Typography>
      </Box>
    );
  }

  return (
    <NewsList articles={favorites} isFavorites={true} onFavorite={onRemove} />
  );
};

export default FavoritesList;
