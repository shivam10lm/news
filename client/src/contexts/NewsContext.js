import React, { createContext, useContext } from "react";
import { useNews } from "../hooks/useNews";
import { useFavorites } from "../hooks/useFavorites";
import api from "../utils/api";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { articles, loading, error, page, totalPages, setPage, handleSearch } =
    useNews();

  const { favorites, fetchFavorites } = useFavorites();

  const handleFavorite = async (article) => {
    try {
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.title === article.title
      );

      if (isAlreadyFavorite) {
        const favoriteArticle = favorites.find(
          (fav) => fav.title === article.title
        );
        await api.delete(`/favorites/${favoriteArticle.id}`);
      } else {
        await api.post("/favorites", article);
      }
      fetchFavorites();
    } catch (err) {
      console.error("Failed to update favorites");
    }
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        loading,
        error,
        page,
        totalPages,
        setPage,
        handleSearch,
        favorites,
        handleFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => useContext(NewsContext);
