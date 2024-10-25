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

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, fetchFavorites };
};
