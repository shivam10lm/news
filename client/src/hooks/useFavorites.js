import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      //   const response = await axios.get("http://localhost:5001/api/favorites");
      //   setFavorites(response.data);
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
