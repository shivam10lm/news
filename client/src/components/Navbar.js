import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Toolbar } from "@mui/material";
import { useNewsContext } from "../contexts/NewsContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { handleSearch } = useNewsContext();

  const handleLogoClick = (e) => {
    e.preventDefault();
    handleSearch("");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        alignItems: "center",
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="h6"
          onClick={handleLogoClick}
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          NEWS APP
        </Typography>
        <Button
          component={Link}
          to="/favorites"
          sx={{
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Favorites
        </Button>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
