const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// 1. Search News
app.get("/api/news/search", async (req, res) => {
  try {
    const { q = "technology", page = 1, language = "en" } = req.query;

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q,
        language,
        apiKey: NEWS_API_KEY,
        page,
        pageSize: 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error searching news:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error fetching news" });
  }
});

// 2. Get News by Category
app.get("/api/news/categories", async (req, res) => {
  try {
    const { category = "general", page = 1, country = "us" } = req.query;

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category,
        country,
        apiKey: NEWS_API_KEY,
        page,
        pageSize: 10,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching category news:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error fetching news" });
  }
});

// 3. Get Favorite Articles
app.get("/api/favorites", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM favorites ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

// 4. Add to Favorites
app.post("/api/favorites", async (req, res) => {
  try {
    const { title, description, url, urlToImage, publishedAt, source } =
      req.body;

    const [result] = await db.query(
      "INSERT INTO favorites (title, description, url, urlToImage, publishedAt, source) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, url, urlToImage, publishedAt, source]
    );

    res.json({
      message: "Added to favorites",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ message: "Error adding to favorites" });
  }
});

// 5. Remove from Favorites
app.delete("/api/favorites/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM favorites WHERE id = ?", [req.params.id]);
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error.message);
    res.status(500).json({ message: "Error removing from favorites" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
