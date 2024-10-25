import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Navigation from "./Navigation";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Reset to home page and trigger a new fetch with default query
    navigate("/");
    window.location.reload(); // This is a temporary fix - a better solution would be to lift state up
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            onClick={handleHomeClick}
          >
            News App
          </Typography>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
        </Toolbar>
      </Container>
      <Navigation />
    </AppBar>
  );
};

export default Navbar;
