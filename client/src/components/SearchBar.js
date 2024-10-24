// components/SearchBar.js
import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton as MUIIconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const MAX_HISTORY_LENGTH = 10; // Maximum number of search history items

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Update history and maintain unique entries
      const updatedHistory = [query, ...searchHistory]
        .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
        .slice(0, MAX_HISTORY_LENGTH); // Limit to MAX_HISTORY_LENGTH
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      onSearch(query);
      setQuery(""); // Clear input field
      setShowDropdown(false); // Close dropdown after search
    }
  };

  const handleDelete = (itemToDelete) => {
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToDelete
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        margin: "20px auto",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search news..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(e.target.value.length > 0); // Show dropdown only when typing
          }}
          onFocus={() => setShowDropdown(true)} // Show dropdown on focus
          onBlur={() => {
            // Hide dropdown when the input loses focus
            setTimeout(() => setShowDropdown(false), 200); // Delay to allow click on dropdown
          }}
        />
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Dropdown for Search History */}
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%", // Match width with search bar
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            borderRadius: "4px",
            marginTop: "4px", // Optional: add slight space above dropdown
          }}
        >
          <List>
            {searchHistory.length === 0 ? (
              <ListItem>
                <ListItemText primary="No search history available." />
              </ListItem>
            ) : (
              searchHistory.map((item, index) => (
                <div key={index}>
                  <ListItem
                    button
                    onClick={() => {
                      setQuery(item);
                      onSearch(item);
                      setShowDropdown(false); // Close dropdown on selection
                    }}
                  >
                    <ListItemText primary={item} />
                    <MUIIconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the onClick of ListItem
                        handleDelete(item);
                      }}
                    >
                      <CloseIcon />
                    </MUIIconButton>
                  </ListItem>
                  <Divider />
                </div>
              ))
            )}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
