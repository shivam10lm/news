import React from "react";
import NewsList from "./NewsList";
import { Typography } from "@mui/material";

const FavoritesList = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        No favorite articles yet.
      </Typography>
    );
  }

  return (
    <NewsList articles={favorites} isFavorites={true} onFavorite={onRemove} />
  );
};

export default FavoritesList;
