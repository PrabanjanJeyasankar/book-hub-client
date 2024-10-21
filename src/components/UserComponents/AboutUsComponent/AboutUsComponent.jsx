import React from "react";
import "./AboutUsComponent.css";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/img/about_us_image.webp";

function AboutUsComponent() {
  return (
    <div className="about-us-container">
      <div className="about-us-image">
        <img src={HeroImage} alt="Fire emoji, search icon, and book" />
      </div>
      <div className="about-us-content">
        <h1>Bonjour, bibliophiles!</h1>
        <blockquote className="funny-quote">
          "One book a day keeps the mundane at bay!"
        </blockquote>
        <p>
          Here at Book Hub, we believe that every book is a portal to another
          world—like a magic carpet, but with fewer bugs. We're dedicated to
          making your reading experience as smooth as a librarian's shushing
          skills.
        </p>
        <p>
          Whether you're searching for the latest bestseller, a hidden gem, or
          just a book that won't make you look too embarrassed on the train,
          we've got your back! So, dive into our collection, explore, and let's
          find the perfect read for your next adventure.
        </p>
        <p>
          Remember, if you can't find us, we're probably buried under a pile of
          books... just kidding! We're always here to help you uncover your next
          favorite read.
        </p>
        <Link to="/search" className="start-hunting-link">
          Start Hunting Books!
        </Link>
      </div>
    </div>
  );
}

export default AboutUsComponent;
