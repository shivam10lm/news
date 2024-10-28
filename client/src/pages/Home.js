import React from "react";
import {
  Container,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from "@mui/material";
import { NewsList, SearchBar, Categories } from "../components";
import { useNewsContext } from "../contexts/NewsContext";

const Home = () => {
  const {
    articles,
    loading,
    error,
    page,
    totalPages,
    setPage,
    handleSearch,
    favorites,
    handleFavorite,
  } = useNewsContext();

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
            favorites={favorites}
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
