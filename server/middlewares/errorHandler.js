const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.response) {
    // Error from external API
    return res.status(err.response.status || 500).json({
      message: err.response.data.message || "External API error",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
