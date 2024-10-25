import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Categories = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState();

  const categories = [
    "General",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryClick(category)}
          variant={selectedCategory === category ? "contained" : "outlined"}
          sx={{ textTransform: "none" }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default Categories;
