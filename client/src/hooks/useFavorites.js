import { useState, useEffect } from "react";
import api from "../utils/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to fetch favorites");
    }
  };

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

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, handleFavorite, fetchFavorites };
};
