import { Heart } from "lucide-react";
import useLikeBook from "../../../hooks/useLikeBook.js";
import "./LikeButtonComponent.css";

function LikeButtonComponent({ bookId, isUserLiked, setIsUserLiked }) {
  const { handleLikeClick, isProcessing } = useLikeBook(
    bookId,
    isUserLiked,
    setIsUserLiked,
  );

  return (
    <Heart
      className={`heart-icon ${isUserLiked ? "liked" : ""}`}
      size={26}
      strokeWidth={2}
      onClick={handleLikeClick}
      disabled={isProcessing}
    />
  );
}

export default LikeButtonComponent;
