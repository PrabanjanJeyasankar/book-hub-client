import { useState, useEffect, useRef } from "react";
import DummyProfileImage from "../../../../assets/img/default_user_profile.jpg";
import "./ProfilePictureUploadComponent.css";
import { Camera, Pencil } from "lucide-react";
import patchUserProfilePicture from "../../../../services/patchUserProfilePicture";
import fetchUserProfilePicture from "../../../../services/fetchUserProfilePicture";
import { toast } from "react-hot-toast";
import Button from "../../../SharedComponents/ButtonComponent/ButtonComponent";
import { useUserContext } from "../../../../context/UserContext/UserContext";

const ProfilePictureUploadComponent = () => {
  const { isLoggedIn } = useUserContext();
  const [imageSrc, setImageSrc] = useState(DummyProfileImage);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const loadProfilePicture = async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    try {
      const data = await fetchUserProfilePicture();
      if (data.profileImage) {
        setImageSrc(data.profileImage);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      toast.error("Could not load profile image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadProfilePicture();
    }
  }, [isLoggedIn]);

  const handleError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || "An error occurred";

      switch (status) {
        case 400:
          toast.error("Bad Request: " + message);
          break;
        case 404:
          toast.error("Not Found: " + message);
          break;
        case 500:
          toast.error("Server Error: " + message);
          break;
        default:
          toast.error("Error updating profile image: " + message);
      }
    } else {
      console.error("Unexpected error:", error);
      toast.error("Error updating profile image. Please try again.");
    }
  };

  const handleProfileImageUpdate = async (file) => {
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const response = await patchUserProfilePicture(data);
      if (response.status === 200) {
        toast.success("Profile image updated successfully!");
      } else {
        toast.error("Unexpected error occurred.");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      await handleProfileImageUpdate(file);
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="user-pfp-container">
      <div className="img-wrapper">
        {loading ? (
          <div className="outer-loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <img src={imageSrc} alt="Profile" className="user-pfp-image" />
            <Button
              className="resp-edit-pfp-button"
              onClick={handleEditButtonClick}
            >
              <Pencil size={12} />
              <span>Edit image</span>
            </Button>
          </>
        )}
      </div>
      <div className="user-pfp-status-indicator">
        <label className="user-pfp-label" htmlFor="file">
          <Camera /> <span>Change Image</span>
        </label>
      </div>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={loadFile}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ProfilePictureUploadComponent;
