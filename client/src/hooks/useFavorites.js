import { useState, useEffect, useRef } from "react";
import api from "../utils/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialFetch = useRef(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch.current) {
      initialFetch.current = false;
      fetchFavorites();
    }
  }, []);

  return { favorites, fetchFavorites, loading };
};
