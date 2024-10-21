import { useEffect } from "react";
import "./HeroComponent.css";
import SearchFormComponent from "../../SharedComponents/SearchBarComponent/SearchBarComponent";
import book3DAsset from "../../../assets/img/book_3d_assets_2.webp";

function HeroComponent() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const offsetX = (0.5 - x / windowWidth) * 50;
      const offsetY = (0.5 - y / windowHeight) * 50;

      const image = document.querySelector(".hero-book-3d-asset");
      if (image) {
        image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="hero-outer-container">
        <div className="hero-container">
          <div className="hero-section-left">
            <div className="hero-content">
              <div className="hero-title">
                Discover the book that{" "}
                <span className="hero-hightlight-text">
                  Won&#8217;t Judge You.
                </span>
                {/* Discover  <span className='hero-hightlight-text'>the Book</span> That Won&#8217;t Judge You. */}
              </div>
              <div className="hero-description">
                Search effortlessly, Start Reading.
              </div>
            </div>
            <div className="search-component">
              <SearchFormComponent stlyingClassName="hero-search-bar" />
            </div>
          </div>
          <div className="hero-content-right">
            <img
              className="hero-book-3d-asset"
              src={book3DAsset}
              alt="landing-3d-image"
            />
          </div>
        </div>
      </div>
      {/* <div className='hero-feed'>
                <HeroFeedComponent />
            </div> */}
    </>
  );
}

export default HeroComponent;
