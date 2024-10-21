import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeroPageStyling.css";
import "./SearchPageStyling.css";
import Button from "../ButtonComponent/ButtonComponent";

function SearchBarComponent({ initialQuery = "", onSearchChange }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const location = useLocation();

  const isSearchPage =
    location.pathname === "/search" || location.pathname === "/admin/allbooks";
  const containerClass = isSearchPage ? "search-page-bar" : "hero-search-bar";

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate("/search", { state: { query: searchQuery } });
    }
  };

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <div className={`search-container ${containerClass}`}>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form-elem">
          <button
            type="submit"
            className="search-icon"
            aria-label="Search for books"
          >
            <Search />
          </button>

          <input
            type="text"
            className="form-control"
            placeholder="books, authors, or genres..."
            value={searchQuery}
            onChange={handleSearchQuery}
            ref={searchInputRef}
          />
          {isSearchPage && (
            <div className="search-slash">
              <kbd>/</kbd>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBarComponent;
