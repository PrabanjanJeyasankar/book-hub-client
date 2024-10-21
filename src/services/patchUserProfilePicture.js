import axiosInstance from "../utils/axiosInstance";

const patchUserProfilePicture = async (file) => {
  try {
    const response = await axiosInstance.patch("/user/update-profile", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default patchUserProfilePicture;
