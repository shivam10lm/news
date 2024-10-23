import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const NewsCard = ({ article, isFavorites, onFavorite }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Store the article in localStorage for ArticleView
    const articles = JSON.parse(
      localStorage.getItem("currentArticles") || "[]"
    );
    const articleIndex = articles.findIndex((a) => a.title === article.title);
    if (articleIndex === -1) {
      articles.push(article);
      localStorage.setItem("currentArticles", JSON.stringify(articles));
    }
    navigate(
      `/article/${articleIndex !== -1 ? articleIndex : articles.length - 1}`
    );
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage || "https://via.placeholder.com/300x200"}
        alt={article.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200";
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description?.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>
          Read More
        </Button>
        <IconButton
          onClick={() => onFavorite(article)}
          color="primary"
          aria-label={
            isFavorites ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
