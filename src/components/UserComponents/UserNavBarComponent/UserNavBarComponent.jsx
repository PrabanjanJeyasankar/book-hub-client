import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext/UserContext";
import { CircleUserRound, LogOut } from "lucide-react";
import "./UserNavBarComponent.css";

import logoImage from "../../../assets/img/open_book_logo.webp";
import DefaultProfileImage from "../../../assets/img/default_user_profile.jpg";
import axiosInstance from "../../../utils/axiosInstance";
import fetchUserProfilePicture from "../../../services/fetchUserProfilePicture";

function UserNavBarComponent() {
  const { isLoggedIn, userProfile, setIsLoggedIn, setUserProfile } =
    useContext(UserContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(DefaultProfileImage);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const loadProfilePicture = async () => {
    if (isLoggedIn) {
      try {
        const data = await fetchUserProfilePicture();
        if (data.profileImage) {
          setImageSrc(data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    }
  };

  useEffect(() => {
    loadProfilePicture();
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    axiosInstance
      .get("/user/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUserProfile(null);
          localStorage.removeItem("userProfile");
          localStorage.removeItem("isLoggedIn");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const closeDropdown = (e) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <a class="skip-to-content-link" href="#main">
        Skip to main content
      </a>
      <nav className="user-navbar">
        <div className="user-navbar-container">
          <div className="hamburger-container">
            <div
              className={`hamburger ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span className="line" id="line-top"></span>
              <span className="line" id="line-bottom"></span>
            </div>
          </div>

          <div className="user-navbar-brand">
            <Link to="/" className="user-page-app-logo">
              <img src={logoImage} alt="Book hub logo" />
              <span className="app-name">Book hub</span>
            </Link>
          </div>

          <div className={`user-navbar-center ${isMenuOpen ? "hidden" : ""}`}>
            <div className="page-links">
              <Link to="/">Home</Link>
              <Link to="/search">Search Books</Link>
              <Link to="/about">About us</Link>
            </div>
          </div>

          {isMenuOpen && (
            <div className="menuDropDown">
              <div className="resp-page-links">
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
                <Link to="/search" onClick={toggleMenu}>
                  Search Books
                </Link>
                <Link to="/about" onClick={toggleMenu}>
                  About us
                </Link>
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div className="signup-login-links">
              <div className="user-profile-btn" ref={dropdownRef}>
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="user-nav-profile-icon"
                  onClick={handleProfileClick}
                  aria-label="Profile picture"
                />
                {isDropdownOpen && (
                  <div className="user-profile-dropdown-menu open">
                    <div className="user-profile-dropdown-header">
                      <img
                        src={imageSrc}
                        alt="Profile"
                        className="user-profile-dropdown-image"
                      />
                      <Link
                        to="/user-profile"
                        className="user-profile-dropdown-name"
                      >
                        {userProfile.name}
                      </Link>
                    </div>
                    <ul className="user-profile-dropdown-list">
                      <li onClick={() => setIsDropdownOpen(false)}>
                        <Link to="/user-profile">
                          <CircleUserRound strokeWidth={2} size={18} />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li>
                        <a onClick={handleLogout}>
                          <LogOut strokeWidth={2} size={18} />
                          <p>Log out</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <div className="signup-login-links">
              <Link className="login-btn" to="/login">
                Login
              </Link>
              <Link className="signup-btn" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default UserNavBarComponent;
