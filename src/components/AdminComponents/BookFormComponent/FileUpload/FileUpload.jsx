import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import "./FileUpload.css";

const FileUpload = ({ onFileChange, error, imagePreview, coverImage }) => {
  const [fileError, setFileError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setFileError(
          `Invalid file type: ${rejectedFiles
            .map((file) => file.name)
            .join(", ")}`,
        );
        return;
      }
      setFileError(null);
      onFileChange(acceptedFiles);
      // console.log('Accepted files:', acceptedFiles)
    },
    accept: "image/jpeg, image/png, image/gif",
    multiple: false,
  });

  // console.log('Image Preview:', imagePreview)

  return (
    <>
      <div
        {...getRootProps()}
        className={`book-dropzone ${
          error || fileError ? "book-error-border" : ""
        }`}
      >
        <input {...getInputProps()} />
        {imagePreview || coverImage ? (
          <div className="book-image-preview-container">
            <img
              src={
                imagePreview ||
                (coverImage instanceof File
                  ? URL.createObjectURL(coverImage)
                  : coverImage)
              }
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <div className="drag_drop_info">
            <CloudUpload size={90} strokeWidth={1} color="rgb(200, 200, 200)" />
            <p>Drag & Drop or Click to Upload</p>
          </div>
        )}
      </div>
      {(error || fileError) && (
        <span className="book-error">{error || fileError}</span>
      )}
    </>
  );
};

export default FileUpload;
