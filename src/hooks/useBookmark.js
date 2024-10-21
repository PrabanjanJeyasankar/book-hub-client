import { useState, useEffect } from "react";
import addBookToUserPreference from "../services/addBookToUserPreference";
import useUserContext from "./useUserContext";
import toast from "react-hot-toast";

const useBookmark = (bookId, readingState, setIsUserBookmarked) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState("none");
  const { isLoggedIn } = useUserContext();

  useEffect(() => {
    if (readingState) {
      setBookmarkStatus(readingState);
      setIsUserBookmarked(true);
    } else {
      setBookmarkStatus("none");
      setIsUserBookmarked(false);
    }
  }, [readingState, setIsUserBookmarked]);

  const toggleDropdown = () => {
    if (!isLoggedIn) {
      toast.error("Please Login to bookmark books.");
      return;
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const updateBookmarkStatus = (status) => {
    if (status === bookmarkStatus) {
      setBookmarkStatus("none");
      setIsUserBookmarked(false);
      addBookToUserPreference(bookId, "none");
    } else {
      setBookmarkStatus(status);
      setIsUserBookmarked(true);
      addBookToUserPreference(bookId, status);
    }
    setIsDropdownOpen(false);
  };

  return {
    isDropdownOpen,
    bookmarkStatus,
    toggleDropdown,
    updateBookmarkStatus,
  };
};

export default useBookmark;
