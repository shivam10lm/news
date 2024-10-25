import React from "react";
import { Box } from "@mui/material";
import NewsCard from "./NewsCard";

const NewsList = ({ articles, favorites, onFavorite }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        margin: "0 auto",
      }}
    >
      {articles.map((article, index) => (
        <Box
          key={article.id || index}
          sx={{
            flexBasis: {
              xs: "100%",
              sm: "calc(50% - 24px)",
              md: "calc(33.333% - 24px)",
            },
            flexGrow: 0,
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <NewsCard
            article={article}
            favorites={favorites}
            onFavorite={onFavorite}
          />
        </Box>
      ))}
    </Box>
  );
};

export default NewsList;
