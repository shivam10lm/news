import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Categories = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("General"); // Default selected category

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
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: (theme) =>
              selectedCategory === category
                ? theme.palette.primary.main
                : theme.palette.grey[200],
            color: selectedCategory === category ? "white" : "text.primary",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "white",
            },
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default Categories;
