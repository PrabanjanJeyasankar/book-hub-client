import Lottie from "lottie-react";
import BookLoadingAnimation from "../../../assets/animation/book_loading_animation.json";

function LottieBookAnimation() {
  return (
    <Lottie
      animationData={BookLoadingAnimation}
      loop={true}
      autoplay={true}
      style={{ width: "250px", height: "250px", color: "#FFFFFF" }}
    />
  );
}

export default LottieBookAnimation;
