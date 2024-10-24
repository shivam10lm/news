const express = require("express");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { createFavoritesTable } = require("./models/favoriteModel");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoriteRoutes);

// Error handling
app.use(errorHandler);

// Initialize server and database
const startServer = async () => {
  try {
    await createFavoritesTable();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();