import { useState, useEffect } from "react";
import api from "../utils/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchFavorites = async () => {
    if (loading) return; // Prevent multiple calls if already loading
    setLoading(true);
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []); // Empty dependency array ensures it only runs once on mount

  return { favorites, fetchFavorites, loading };
};
