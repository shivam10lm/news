import React from "react";
import { Grid2 } from "@mui/material";
import NewsCard from "./NewsCard";

const NewsList = ({ articles, onFavorite, isFavorites }) => {
  return (
    <Grid2 container spacing={3}>
      {articles.map((article, index) => (
        <Grid2 item xs={12} sm={6} md={4} key={index}>
          <NewsCard
            article={article}
            isFavorites={isFavorites}
            onFavorite={onFavorite}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
export default NewsList;
