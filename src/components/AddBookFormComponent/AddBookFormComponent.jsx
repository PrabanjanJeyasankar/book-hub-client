import React, { useState } from 'react'
import './AddBookFormComponent.css'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

function AddBookFormComponent() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        publicationDate: '',
        genre: '',
        language: '',
        pages: '',
        coverImage: null,
        description: '',
        availableCopies: '',
        location: '',
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleFileChange = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            setFormData({
                ...formData,
                coverImage: file,
            })
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log(formData)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileChange,
        accept: 'image/*',
    })

    return (
        <div className='add-book-container'>
            <h2>Add New Book</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='form-input-container'>
                        <div className='input-column-one'>
                            <div className='inputContainer'>
                                <label htmlFor='title'>Book Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && (
                                    <span className='error'>
                                        {errors.title}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='author'>Author</label>
                                <input
                                    type='text'
                                    name='author'
                                    id='author'
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                                {errors.author && (
                                    <span className='error'>
                                        {errors.author}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='genre'>Genre</label>
                                <select
                                    name='genre'
                                    id='genre'
                                    value={formData.genre}
                                    onChange={handleChange}>
                                    <option value='' disabled>
                                        Select Genre
                                    </option>
                                    <option value='Fiction'>Fiction</option>
                                    <option value='Non-Fiction'>
                                        Non-Fiction
                                    </option>
                                    <option value='Science Fiction'>
                                        Science Fiction
                                    </option>
                                    <option value='Fantasy'>Fantasy</option>
                                    <option value='Mystery'>Mystery</option>
                                    <option value='Biography'>Biography</option>
                                    <option value='Historical'>
                                        Historical
                                    </option>
                                    <option value='Romance'>Romance</option>
                                    <option value='Thriller'>Thriller</option>
                                    <option value='Self-Help'>Self-Help</option>
                                    <option value='Horror'>Horror</option>
                                </select>
                                {errors.genre && (
                                    <span className='error'>
                                        {errors.genre}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='publisher'>Publisher</label>
                                <input
                                    type='text'
                                    name='publisher'
                                    id='publisher'
                                    value={formData.publisher}
                                    onChange={handleChange}
                                />
                                {errors.publisher && (
                                    <span className='error'>
                                        {errors.publisher}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='isbn'>ISBN</label>
                                <input
                                    type='text'
                                    name='isbn'
                                    id='isbn'
                                    value={formData.isbn}
                                    onChange={handleChange}
                                />
                                {errors.isbn && (
                                    <span className='error'>{errors.isbn}</span>
                                )}
                            </div>
                        </div>
                        <div className='input-column-two'>
                            <div className='inputContainer'>
                                <label htmlFor='publicationDate'>
                                    Publication Date
                                </label>
                                <input
                                    type='date'
                                    name='publicationDate'
                                    id='publicationDate'
                                    value={formData.publicationDate}
                                    onChange={handleChange}
                                />
                                {errors.publicationDate && (
                                    <span className='error'>
                                        {errors.publicationDate}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='language'>Language</label>
                                <input
                                    type='text'
                                    name='language'
                                    id='language'
                                    value={formData.language}
                                    onChange={handleChange}
                                />
                                {errors.language && (
                                    <span className='error'>
                                        {errors.language}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    name='description'
                                    id='description'
                                    value={formData.description}
                                    onChange={handleChange}></textarea>
                                {errors.description && (
                                    <span className='error'>
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='availableCopies'>
                                    Available Copies
                                </label>
                                <input
                                    type='number'
                                    name='availableCopies'
                                    id='availableCopies'
                                    value={formData.availableCopies}
                                    onChange={handleChange}
                                />
                                {errors.availableCopies && (
                                    <span className='error'>
                                        {errors.availableCopies}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='input-column-three'>
                            <div
                                className='inputContainer'
                                id='book-cover-image'>
                                <label htmlFor='coverImage'>Cover Image</label>
                                {/* <div className='image-input-with-review'> */}
                                    <div {...getRootProps()} className={`dropzone ${
                                            isDragActive ? 'active' : ''
                                        }`}>
                                        <input
                                            {...getInputProps()}
                                            name='coverImage'
                                            id='coverImage'
                                        />
                                        <div className='upload-and-preview'>
                                            {imagePreview ? (
                                                <img
                                                    id='preview-image'
                                                    src={imagePreview}
                                                    alt='Image Preview'
                                                />
                                            ) : (
                                                <div className='drag-drop-upload'>
                                                    <Upload
                                                        size={42}
                                                        className='upload-icon'
                                                    />
                                                    <p>
                                                        Drag 'n' drop a file
                                                        here, or click to select
                                                        files
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {errors.coverImage && (
                                        <span className='error'>
                                            {errors.coverImage}
                                        </span>
                                    )}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <button className='add-book-btn' type='submit'>
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddBookFormComponent
