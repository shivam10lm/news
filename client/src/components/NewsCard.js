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

const NewsCard = ({ article, favorites, onFavorite }) => {
  const navigate = useNavigate();
  const isFavorited = favorites?.some((fav) => fav.title === article.title);

  const handleViewDetails = () => {
    navigate(`/article/${article?.title}`, { state: { article } });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height={140}
        image={article.urlToImage}
        alt={article.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {new Date(article.publishedAt).toLocaleDateString()} |{" "}
          {article?.source?.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "20px" }}
        >
          {article.description?.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>
          Read More
        </Button>
        <IconButton
          onClick={() => onFavorite(article)}
          color={isFavorited ? "secondary" : "default"}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
