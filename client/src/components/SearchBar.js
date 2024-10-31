import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  ClickAwayListener,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const MAX_HISTORY_LENGTH = 5;

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const updateSearchHistory = (newQuery) => {
    const updatedHistory = [newQuery, ...searchHistory]
      .filter((item, index, self) => self.indexOf(item) === index)
      .slice(0, MAX_HISTORY_LENGTH);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      updateSearchHistory(query.trim());
      setShowDropdown(false);
      navigate(`/search/${query.trim()}`);
    }
  };

  const handleHistoryClick = (item) => {
    setQuery(item);
    onSearch(item);
    setShowDropdown(false);
    navigate(`/search/${item}`);
  };

  const handleDelete = (e, itemToDelete) => {
    e.stopPropagation();
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToDelete
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
      <Box sx={{ position: "relative", maxWidth: 600, margin: "20px auto" }}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            boxShadow: 2,
          }}
        >
          <InputBase
            ref={inputRef}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          <IconButton type="submit" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {showDropdown && searchHistory.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              mt: 1,
              maxHeight: 300,
              overflow: "auto",
              zIndex: 1,
              boxShadow: 3,
            }}
          >
            <List>
              {searchHistory.map((item, index) => (
                <Box key={index}>
                  <ListItem
                    button
                    onClick={() => handleHistoryClick(item)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemText primary={item} />
                    <IconButton
                      size="small"
                      onClick={(e) => handleDelete(e, item)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                  {index < searchHistory.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
