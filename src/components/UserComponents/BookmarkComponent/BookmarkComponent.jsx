import { Bookmark } from "lucide-react";
import "./BookmarkComponent.css";
import useBookmark from "../../../hooks/useBookmark";

function BookmarkComponent({
  bookId,
  isUserBookmarked,
  setIsUserBookmarked,
  readingState,
}) {
  const {
    isDropdownOpen,
    bookmarkStatus,
    toggleDropdown,
    updateBookmarkStatus,
  } = useBookmark(bookId, readingState, setIsUserBookmarked);

  return (
    <div className="bookmark_container">
      <Bookmark
        className={`bookmark_icon ${
          isUserBookmarked ? "bookmarked" : ""
        } ${bookmarkStatus ? bookmarkStatus : ""}`}
        size={26}
        strokeWidth={2}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="bookmark__dropdown">
          <div
            className={`bookmark_dropdown_option ${
              bookmarkStatus === "finishedReading" ? "selected" : ""
            }`}
            id="finished_reading_option"
            onClick={() => updateBookmarkStatus("finishedReading")}
          >
            Finished Reading
          </div>
          <div
            className={`bookmark_dropdown_option ${
              bookmarkStatus === "currentlyReading" ? "selected" : ""
            }`}
            id="currently_reading_option"
            onClick={() => updateBookmarkStatus("currentlyReading")}
          >
            Currently Reading
          </div>
          <div
            className={`bookmark_dropdown_option ${
              bookmarkStatus === "wantToRead" ? "selected" : ""
            }`}
            id="want_to_read_option"
            onClick={() => updateBookmarkStatus("wantToRead")}
          >
            Want to Read
          </div>
        </div>
      )}
    </div>
  );
}

export default BookmarkComponent;
