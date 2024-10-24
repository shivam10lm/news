const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/search", newsController.searchNews);
router.get("/categories", newsController.getNewsByCategory);

module.exports = router;
