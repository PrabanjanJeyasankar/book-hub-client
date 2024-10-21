const validateBookForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    if (!formData[key] && key !== "coverImage") {
      errors[key] = `* ${
        key.charAt(0).toUpperCase() + key.slice(1)
      } is required`;
    }
  });
  if (!formData.coverImage) {
    errors.coverImage = "* Cover image is required";
  }
  return errors;
};

export default validateBookForm;
