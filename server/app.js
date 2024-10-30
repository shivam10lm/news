const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const newsRoutes = require("./routes/newsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { createFavoritesTable } = require("./models/favoriteModel");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/news", newsRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use(errorHandler);

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
