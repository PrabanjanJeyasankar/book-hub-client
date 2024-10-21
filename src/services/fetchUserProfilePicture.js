import axiosInstance from "../utils/axiosInstance";

const fetchUserProfilePicture = async () => {
  const response = await axiosInstance.get("/user/profile-picture", {
    withCredentials: true,
  });
  return response.data;
};

export default fetchUserProfilePicture;
