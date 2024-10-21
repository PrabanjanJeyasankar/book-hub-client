import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext/UserContext";
import "./UserProfileComponent.css";

import BookCardComponent from "../../../SharedComponents/BookCardComponent/BookCardComponent";
import fetchUserPreferences from "../../../../services/fetchUserPreferences";
import ToggleReadingStatus from "../ToggleReadingStatus/ToggleReadingStatus";
import ToggleLikedAndBookmark from "../ToggleLikedAndBookmark/ToggleLikedAndBookmark";
import ProfilePictureUploadComponent from "../ProfilePictureUploadComponent/ProfilePictureUploadComponent";
import PageLoadingAnimation from "../../../SharedComponents/PageLoadingAnimation/PageLoadingAnimation";
function UserProfileComponent() {
  const { userProfile } = useContext(UserContext);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userLikedBooks, setUserLikedBooks] = useState([]);
  const [selectedReadingStatus, setSelectedReadingStatus] =
    useState("currentlyReading");
  const [showLikedBooks, setShowLikedBooks] = useState(true);
  if (!userProfile) {
    return (
      <div>
        <PageLoadingAnimation />
      </div>
    );
  }

  useEffect(() => {
    if (userProfile) {
      fetchUserPreferences()
        .then((data) => {
          setUserBookmarks(data.preferences.bookmarkedBooks);
          // console.log(data.preferences.bookmarkedBooks)
          setUserLikedBooks(data.preferences.likedBooks);
          // console.log(data.preferences.likedBooks)
        })
        .catch((error) => {
          console.error("Error fetching preferences", error);
        });
    }
  }, [userProfile]);

  const filteredBookmarks = userBookmarks.filter(
    (bookmark) => bookmark.readingStatus === selectedReadingStatus,
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <ProfilePictureUploadComponent />
        <div className="profile-info">
          <h1 className="profile-name">{userProfile && userProfile.name}</h1>
          <p className="profile-email">{userProfile && userProfile.email}</p>
        </div>
      </div>
      <div className="profile-content">
        <ToggleLikedAndBookmark
          showLikedBooks={showLikedBooks}
          setShowLikedBooks={setShowLikedBooks}
        />
        {showLikedBooks && (
          <div className="liked-books-list">
            {userLikedBooks.map((book, index) => (
              <BookCardComponent key={index} book={book} />
            ))}
          </div>
        )}

        {!showLikedBooks && (
          <>
            <ToggleReadingStatus
              selectedReadingStatus={selectedReadingStatus}
              setSelectedReadingStatus={setSelectedReadingStatus}
            />
            <div className="bookmark-list">
              {filteredBookmarks.map((bookmark, index) => (
                <BookCardComponent key={index} book={bookmark.book} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfileComponent;
