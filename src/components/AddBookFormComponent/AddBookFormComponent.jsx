import React, { useRef, useState } from 'react'
import './AddBookFormComponent.css'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import axios from 'axios'
import ModalComponent from '../ModalComponent/ModalComponent'
import greenTick from '../../assets/img/accept.png'
import yellowWarning from '../../assets/img/warning.png'
import redWarning from '../../assets/img/mark.png'

function AddBookFormComponent() {
    const initialFormState = {
        title: '',
        author: '',
        genre: '',
        publisher: '',
        isbn: '',
        publicationDate: '',
        language: '',
        description: '',
        availableCopies: '',
    }

    const [formData, setFormData] = useState(initialFormState)
    const [isClearing, setIsClearing] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [errors, setErrors] = useState({})
    const [popupMessageBody, setPopupMessageBody] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [popupImageSrc, setPopupImageSrc] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const publicationDateRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleClear = (e) => {
        e.preventDefault()
        setIsClearing(true)
        setFormData(initialFormState)
        setErrors({})
        setImagePreview(null)
        setTimeout(() => setIsClearing(false), 100)
    }

    const handleFileChange = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                coverImage: file,
            }))
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    const handleDateFocus = () => {
        publicationDateRef.current.showPicker()
    }

    const validateForm = () => {
        if (isClearing) return true

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            const data = new FormData()
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key])
            })

            try {
                const response = await axios.post(
                    'http://localhost:3500/api/v1/book/add',
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )

                if (response.status === 201) {
                    const bookTitle =
                        response.data?.book?.title || 'Unknown Book'
                    setPopupImageSrc(greenTick)
                    setPopupMessageTitle('Book Added Successfully')
                    setPopupMessageBody(
                        `"${bookTitle}" has been added successfully!`
                    )
                } else {
                    setPopupImageSrc(redWarning)
                    setPopupMessageTitle('Unexpected Status Code')
                    setPopupMessageBody(
                        `An unexpected error occurred while submitting the form. Please try again later.`
                    )
                }

                setIsModalOpen(true)
            } catch (error) {
                console.log('Error Message:', error.message)
                console.log(
                    'Error Response Status:',
                    error.response ? error.response.status : 'No response'
                )
                console.log(
                    'Error Response Data:',
                    error.response ? error.response.data : 'No response data'
                )
                if (error.response) {
                    if (error.response.status === 409) {
                        setPopupImageSrc(yellowWarning)
                        setPopupMessageTitle('Oops.. Book Already Exists!')
                        setPopupMessageBody(
                            `${error.response.data?.book?.title} is already exist, kindly check.`
                        )
                    } else {
                        setPopupImageSrc(redWarning)
                        setPopupMessageTitle('An Unexpected Error Occurred')
                        setPopupMessageBody(
                            'An unexpected error occurred while submitting the form. Please try again later.'
                        )
                    }
                } else {
                    setPopupImageSrc(redWarning)
                    setPopupMessageTitle('An Unexpected Error Occurred')
                    setPopupMessageBody(
                        'An unexpected error occurred while submitting the form. Please check your network connection and try again.'
                    )
                }

                setIsModalOpen(true)
            }
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileChange,
        accept: 'image/*',
    })

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='add-book-container'>
            <form className='add-book-form' onSubmit={handleSubmit}>
                <div className='form-container'>
                    <h2 className='form-title'>Add a new book</h2>
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
                                    <option value='Non Fiction'>
                                        Non Fiction
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
                                    onFocus={handleDateFocus}
                                    ref={publicationDateRef}
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
                                <div
                                    {...getRootProps()}
                                    className={`dropzone ${
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
                                                    Drag 'n' drop a file here,
                                                    or click to select files
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
                            </div>
                        </div>
                    </div>
                    <div className='action-buttons'>
                        <button
                            className='clear-field-button'
                            onClick={handleClear}>
                            Clear form
                        </button>
                        <button
                            className='add-book-button'
                            type='submit'
                            onClick={handleSubmit}>
                            Add Book
                        </button>
                    </div>
                </div>
            </form>
            <ModalComponent
                popupImageSrc={popupImageSrc}
                popupMessageTitle={popupMessageTitle}
                popupMessageBody={popupMessageBody}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default AddBookFormComponent
