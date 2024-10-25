const createConnection = require("../config/db");

// Model function to create the favorites table
const createFavoritesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      url VARCHAR(255),
      urlToImage VARCHAR(255),
      publishedAt VARCHAR(50),
      sourceId VARCHAR(100),
      sourceName VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const connection = await createConnection();
  try {
    await connection.query(query);
    console.log("Favorites table verified");
  } catch (error) {
    console.error("Error creating favorites table:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

// Get all favorites
const getFavorites = async () => {
  const connection = await createConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM favorites ORDER BY created_at DESC"
    );
    return rows;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

// Add a favorite
const addFavorite = async (articleData) => {
  const connection = await createConnection();
  try {
    const {
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      sourceId,
      sourceName,
    } = articleData;

    // First check if the article already exists
    const [existing] = await connection.query(
      "SELECT * FROM favorites WHERE title = ?",
      [title]
    );

    if (existing.length > 0) {
      return { error: "Article already exists in favorites" };
    }

    // If not exists, insert it
    const [result] = await connection.query(
      `INSERT INTO favorites 
       (title, description, url, urlToImage, publishedAt, sourceId, sourceName) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, url, urlToImage, publishedAt, sourceId, sourceName]
    );

    return result;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

// Remove a favorite
const removeFavorite = async (id) => {
  const connection = await createConnection();
  try {
    const [result] = await connection.query(
      "DELETE FROM favorites WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  } finally {
    await connection.end();
  }
};

module.exports = {
  createFavoritesTable,
  getFavorites,
  addFavorite,
  removeFavorite,
};
