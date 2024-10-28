import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Toolbar } from "@mui/material";

const Navbar = () => {
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
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
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
          }}
        >
          Favorites
        </Button>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
