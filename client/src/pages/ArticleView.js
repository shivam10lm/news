import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articles = JSON.parse(
      localStorage.getItem("currentArticles") || "[]"
    );
    const foundArticle = articles[parseInt(id)];
    if (foundArticle) {
      setArticle(foundArticle);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!article) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Article not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        {article.urlToImage && (
          <Box
            component="img"
            src={article.urlToImage}
            alt={article.title}
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 1,
              mb: 3,
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400";
            }}
          />
        )}

        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {new Date(article.publishedAt).toLocaleDateString()} |{" "}
          {article.source.name}
        </Typography>

        <Typography variant="body1" paragraph>
          {article.description}
        </Typography>

        <Typography variant="body1" paragraph>
          {article.content}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          Read Full Article
        </Button>
      </Paper>
    </Container>
  );
};

export default ArticleView;
