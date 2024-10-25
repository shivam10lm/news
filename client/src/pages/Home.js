import React from "react";
import {
  Container,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from "@mui/material";
import { NewsList, SearchBar, Categories } from "../components";
import { useNews } from "../hooks/useNews";
import { useFavorites } from "../hooks/useFavorites";
import api from "../utils/api";
const Home = () => {
  const { articles, loading, error, page, totalPages, setPage, handleSearch } =
    useNews();
  const { favorites, fetchFavorites } = useFavorites();

  const handleFavorite = async (article) => {
    try {
      // Check if article is already in favorites
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.title === article.title
      );

      if (isAlreadyFavorite) {
        // Find the favorite article to get its ID
        const favoriteArticle = favorites.find(
          (fav) => fav.title === article.title
        );

        await api.delete(`/favorites/${favoriteArticle.id}`);
      } else {
        await api.post("/favorites", article);
      }
      // Refresh favorites list
      fetchFavorites();
    } catch (err) {
      console.error("Failed to update favorites");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />
      <Categories onSelectCategory={handleSearch} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "40px auto" }} />
      ) : (
        <>
          <NewsList
            articles={articles}
            favorites={favorites} // Pass favorites to NewsList
            onFavorite={handleFavorite}
          />

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
