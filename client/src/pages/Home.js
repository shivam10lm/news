import React, { useEffect } from "react";
import { Container, CircularProgress, Pagination, Box } from "@mui/material";
import { NewsList, SearchBar, Categories } from "../components";
import { useNewsContext } from "../contexts/NewsContext";
import { useParams } from "react-router-dom";

const Home = () => {
  const { searchTerm } = useParams();
  const {
    articles,
    loading,
    page,
    totalPages,
    setPage,
    handleSearch,
    favorites,
    handleFavorite,
  } = useNewsContext();

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm, handleSearch]);

  return (
    <Container sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />
      <Categories onSelectCategory={handleSearch} />

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
