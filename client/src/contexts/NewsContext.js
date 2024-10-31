import React, { createContext, useContext } from "react";
import { useNews } from "../hooks/useNews";
import { useFavorites } from "../hooks/useFavorites";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { articles, loading, error, page, totalPages, setPage, handleSearch } =
    useNews();
  const { favorites, fetchFavorites, handleFavorite } = useFavorites();

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
