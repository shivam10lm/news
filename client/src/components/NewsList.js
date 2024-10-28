import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import NewsCard from "./NewsCard";

const NewsList = ({ articles, favorites, onFavorite }) => {
  return articles?.length ? (
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
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: 8,
      }}
    >
      <Paper
        sx={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No Articles Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Try different search terms or browse categories
        </Typography>
      </Paper>
    </Box>
  );
};

export default NewsList;
