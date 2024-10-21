import React from "react";

const ToggleLikedAndBookmark = ({ showLikedBooks, setShowLikedBooks }) => {
  return (
    <nav className="profile-nav">
      <ul>
        <li
          className={showLikedBooks ? "active" : ""}
          onClick={() => setShowLikedBooks(true)}
        >
          <a href="#liked-books">Liked Books</a>
        </li>
        <li
          className={showLikedBooks ? "" : "active"}
          onClick={() => setShowLikedBooks(false)}
        >
          <a href="#collections">Collections</a>
        </li>
      </ul>
    </nav>
  );
};

export default ToggleLikedAndBookmark;
