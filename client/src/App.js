import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Navbar } from "./components";
import { Home, Favorites, ArticleView } from "./pages";
import { NewsProvider } from "./contexts/NewsContext";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NewsProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/article/:id" element={<ArticleView />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NewsProvider>
    </ThemeProvider>
  );
};

export default App;
