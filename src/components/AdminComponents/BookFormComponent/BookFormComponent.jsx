import { useState, useEffect, useContext } from "react";
import { FormDataContext } from "../../../context/FormContext/FormContext";
import "./BookFormComponent.css";
import InputField from "./InputField/InputField";
import FileUpload from "./FileUpload/FileUpload";
import handleFileChange from "../../../utils/handleFileChange";
import validateBookForm from "../../../utils/formValidation";
import ButtonComponent from "../../SharedComponents/ButtonComponent/ButtonComponent";
import validateInput from "../../../utils/inputValidation";

const BookFormComponent = ({
  handleSubmit,
  title,
  imagePreview,
  setImagePreview,
}) => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [errors, setErrors] = useState({});

  const onFileChange = (acceptedFiles) => {
    // Handle accepted files
    handleFileChange(acceptedFiles, setFormData, setImagePreview, setErrors);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateBookForm(formData, imagePreview);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      handleSubmit(e);
    }
  };

  const handleClearField = () => {
    setFormData({
      title: "",
      author: "",
      genre: "",
      publisher: "",
      isbn: "",
      publicationDate: "",
      language: "",
      description: "",
      availableCopies: "",
      coverImage: null,
    });
    setErrors({});
    setImagePreview(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // Clean up the URL if necessary
      }
    };
  }, [imagePreview]);

  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleFormSubmit}>
        <h2 className="book-form-title">{title}</h2>
        <div className="book-form-wrapper">
          <div className="book-form-input-container">
            <div className="book-form-left-column">
              <InputField
                outerDivClassName="book-input-column"
                label="Book Title"
                name="title"
                className="book-text-input"
                value={formData.title}
                onChange={handleFormInputChange}
                error={errors.title}
              />
              <div className="book-input-column">
                <InputField
                  outerDivClassName="book-input-column"
                  label="Author"
                  name="author"
                  className="book-text-input"
                  value={formData.author}
                  onChange={handleFormInputChange}
                  error={errors.author}
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="Genre"
                  name="genre"
                  className="book-select-input"
                  value={formData.genre}
                  onChange={handleFormInputChange}
                  error={errors.genre}
                  type="select"
                  options={[
                    { value: "", label: "Select Genre" },
                    { value: "Fiction", label: "Fiction" },
                    {
                      value: "Non-Fiction",
                      label: "Non-Fiction",
                    },
                    { value: "Mystery", label: "Mystery" },
                    { value: "Fantasy", label: "Fantasy" },
                    {
                      value: "Science Fiction",
                      label: "Science Fiction",
                    },
                  ]}
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="Publisher"
                  name="publisher"
                  className="book-text-input"
                  value={formData.publisher}
                  onChange={handleFormInputChange}
                  error={errors.publisher}
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="ISBN"
                  name="isbn"
                  className="book-text-input"
                  value={formData.isbn}
                  onChange={handleFormInputChange}
                  error={errors.isbn}
                  type="text"
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="Publication Date"
                  name="publicationDate"
                  className="book-text-input"
                  value={formData.publicationDate.split("T")[0] || ""} // Ensure correct date format
                  onChange={handleFormInputChange}
                  error={errors.publicationDate}
                  type="date"
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="Language"
                  name="language"
                  className="book-text-input"
                  value={formData.language}
                  onChange={handleFormInputChange}
                  error={errors.language}
                />
                <InputField
                  outerDivClassName="book-input-column"
                  label="Available Copies"
                  name="availableCopies"
                  className="book-text-input"
                  value={formData.availableCopies}
                  onChange={handleFormInputChange}
                  error={errors.availableCopies}
                  type="text"
                />
              </div>
            </div>
            <div className="book-form-right-column">
              <InputField
                outerDivClassName="book-input-column"
                label="Description"
                name="description"
                className="book-textarea-input"
                value={formData.description}
                onChange={handleFormInputChange}
                error={errors.description}
                type="textarea"
              />
              <div className="book-input-column">
                <label className="book-label">Cover Image</label>
                <FileUpload
                  onFileChange={onFileChange}
                  imagePreview={imagePreview}
                  error={errors.coverImage}
                  coverImage={formData.coverImage}
                />
              </div>
            </div>
          </div>
          <div className="book-action-buttons">
            <ButtonComponent
              type="button"
              className="book-clear-field-button"
              onClick={handleClearField}
            >
              Clear Fields
            </ButtonComponent>
            <ButtonComponent type="submit" className="add-book-button">
              Submit
            </ButtonComponent>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookFormComponent;
