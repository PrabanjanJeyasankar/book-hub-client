import axiosInstance from "../utils/axiosInstance";

const addBookService = async (formData) => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  try {
    const response = await axiosInstance.post("/book/add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status == 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default addBookService;
