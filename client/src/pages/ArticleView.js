import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ArticleView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article;

  const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  if (!article) {
    return (
      <Container sx={{ py: 4 }}>
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
          />
        )}

        <Typography variant="h4" gutterBottom>
          {article?.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {new Date(article.publishedAt).toLocaleDateString()} |{" "}
          {article?.source?.name}
        </Typography>

        {article?.description && (
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{ marginBottom: "16px" }}
          >
            {article.description}
          </Typography>
        )}

        {article?.content && (
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{ marginBottom: "16px" }}
          >
            {stripHtmlTags(article.content)?.slice(0, -13)}
          </Typography>
        )}

        {article?.url && (
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
        )}
      </Paper>
    </Container>
  );
};

export default ArticleView;
