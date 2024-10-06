import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './BookFormComponent.css'

const BookFormComponent = ({ formData, setFormData, handleSubmit, title }) => {
    const [imagePreview, setImagePreview] = useState(null)
    const [errors, setErrors] = useState({})

    const handleFileChange = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
            if (validMimeTypes.includes(file.type)) {
                setFormData((prevData) => ({ ...prevData, coverImage: file }))
                const previewUrl = URL.createObjectURL(file)
                setImagePreview(previewUrl)
                return () => URL.revokeObjectURL(previewUrl)
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    coverImage:
                        '* Invalid file type. Please upload an image file (jpg, png, gif).',
                }))
            }
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileChange,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })) // Clear error when user types
    }

    const validateForm = () => {
        let formErrors = {}
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== 'coverImage') {
                formErrors[key] = `* ${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } is required`
            }
        })
        if (!formData.coverImage) {
            formErrors.coverImage = '* Cover image is required'
        }
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            handleSubmit() // Call the external submit handler if validation passes
        }
    }

    return (
        <div className='book-form-container'>
            <form className='book-form' onSubmit={handleFormSubmit}>
                <h2 className='book-form-title'>{title}</h2>
                <div className='book-form-wrapper'>
                    {/* Left Side Container */}
                    <div className='book-form-input-container'>
                        <div className='book-form-left-column'>
                            <div className='book-input-column'>
                                <label className='book-label'>Book Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    className='book-text-input'
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && (
                                    <span className='book-error'>
                                        {errors.title}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>Author</label>
                                <input
                                    type='text'
                                    name='author'
                                    className='book-text-input'
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                                {errors.author && (
                                    <span className='book-error'>
                                        {errors.author}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>Genre</label>
                                <select
                                    name='genre'
                                    className='book-select-input'
                                    value={formData.genre}
                                    onChange={handleChange}>
                                    <option value=''>Select Genre</option>
                                    <option value='Fiction'>Fiction</option>
                                    <option value='Non-Fiction'>
                                        Non-Fiction
                                    </option>
                                    <option value='Mystery'>Mystery</option>
                                    <option value='Fantasy'>Fantasy</option>
                                    <option value='Science Fiction'>
                                        Science Fiction
                                    </option>
                                </select>
                                {errors.genre && (
                                    <span className='book-error'>
                                        {errors.genre}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>Publisher</label>
                                <input
                                    type='text'
                                    name='publisher'
                                    className='book-text-input'
                                    value={formData.publisher}
                                    onChange={handleChange}
                                />
                                {errors.publisher && (
                                    <span className='book-error'>
                                        {errors.publisher}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>ISBN</label>
                                <input
                                    type='text'
                                    name='isbn'
                                    className='book-text-input'
                                    value={formData.isbn}
                                    onChange={handleChange}
                                />
                                {errors.isbn && (
                                    <span className='book-error'>
                                        {errors.isbn}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>
                                    Publication Date
                                </label>
                                <input
                                    type='date'
                                    name='publicationDate'
                                    className='book-text-input'
                                    value={formData.publicationDate}
                                    onChange={handleChange}
                                />
                                {errors.publicationDate && (
                                    <span className='book-error'>
                                        {errors.publicationDate}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-column'>
                                <label className='book-label'>Language</label>
                                <input
                                    type='text'
                                    name='language'
                                    className='book-text-input'
                                    value={formData.language}
                                    onChange={handleChange}
                                />
                                {errors.language && (
                                    <span className='book-error'>
                                        {errors.language}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='book-form-right-column'>
                            <div className='book-input-column'>
                                <label className='book-label'>
                                    Description
                                </label>
                                <textarea
                                    name='description'
                                    className='book-textarea-input'
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && (
                                    <span className='book-error'>
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                            <div className='book-input-cover-image'>
                                <label className='book-label'>
                                    Cover Image
                                </label>
                                <div
                                    {...getRootProps({
                                        className: 'book-dropzone',
                                    })}>
                                    <input {...getInputProps()} />
                                    {!imagePreview && (
                                        <p>
                                            Drag 'n' drop a file here, or click
                                            to select files
                                        </p>
                                    )}
                                    {imagePreview && (
                                        <div className='book-image-preview-container'>
                                            <img
                                                src={imagePreview}
                                                alt='Preview'
                                            />
                                        </div>
                                    )}
                                </div>
                                {errors.coverImage && (
                                    <span className='book-error'>
                                        {errors.coverImage}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className='book-action-buttons'>
                    <button
                        type='button'
                        className='book-clear-field-button'
                        onClick={() => setFormData({})}>
                        Clear Fields
                    </button>
                    <button type='submit' className='book-add-button'>
                        {title === 'Add New Book' ? 'Add Book' : 'Update Book'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookFormComponent
