import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import ModalComponent from '../ModalComponent/ModalComponent'
import './EditBookComponent.css'
import greenTick from '../../assets/img/accept.png'
import redWarning from '../../assets/img/mark.png'

function EditBookComponent({ bookId, onClose, onEditSuccess }) {
    const [formData, setFormData] = useState({})
    const [imagePreview, setImagePreview] = useState('')
    const [errors, setErrors] = useState({})
    const [popupImageSrc, setPopupImageSrc] = useState(null)
    const [popupMessageBody, setPopupMessageBody] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const publicationDateRef = useRef(null)

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3500/api/v1/book/${bookId}`
                )
                if (response.data && response.data.book) {
                    const bookData = response.data.book
                    setFormData({
                        title: bookData.title || '',
                        author: bookData.author || '',
                        genre: bookData.genre || '',
                        publisher: bookData.publisher || '',
                        isbn: bookData.isbn || '',
                        publicationDate: bookData.publicationDate
                            ? bookData.publicationDate.split('T')[0]
                            : '',
                        language: bookData.language || '',
                        description: bookData.description || '',
                        availableCopies: bookData.availableCopies || '',
                        coverImage: bookData.coverImage || '',
                    })
                    if (bookData.coverImage) {
                        setImagePreview(
                            `http://localhost:3500/api/v1/${bookData.coverImage}`
                        )
                    }
                }
            } catch (error) {
                console.log('Error fetching book details:', error)
            }
        }

        if (bookId) {
            fetchBookDetails()
        }
    }, [bookId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }

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
                        '* Invalid file type. Please upload an image file.',
                }))
            }
        }
    }

    const validateForm = () => {
        let formErrors = {}
        Object.keys(formData || {}).forEach((key) => {
            if (!formData[key] && key !== 'coverImage') {
                formErrors[key] = `* ${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } is required`
            }
        })
        if (!formData.coverImage && !imagePreview) {
            formErrors.coverImage = '* Cover image is required'
        }
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        if (!validateForm()) return

        const data = new FormData()
        Object.keys(formData || {}).forEach((key) => {
            if (formData[key] !== null) {
                data.append(key, formData[key])
            }
        })
        if (formData.coverImage instanceof File) {
            data.append('coverImage', formData.coverImage)
        }
        try {
            const response = await axios.put(
                `http://localhost:3500/api/v1/book/edit/${bookId}`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            )

            setPopupMessageTitle('Book Updated Successfully')
            setPopupMessageBody(
                `"${response.data.book.title}" has been updated successfully!`
            )
            setPopupImageSrc(greenTick)
            console.log('Setting isModalOpen to true')
            setIsModalOpen(true)
            console.log('Modal should open now')
            console.log('Modal should open')
            if (onEditSuccess) {
                onEditSuccess()
            }
        } catch (error) {
            console.log('Error updating book:', error)
            setPopupMessageTitle('Error')
            setPopupMessageBody('An error occurred while updating the book.')
            setPopupImageSrc(redWarning)
            setIsModalOpen(true)
            console.log('Modal should open with error')
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileChange,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
        },
    })

    const closeModal = () => {
        setIsModalOpen(false)
        if (onClose) onClose()
    }

    if (!formData || Object.keys(formData).length === 0)
        return <div>Loading...</div>

    return (
        <div className='edit-book-container'>
            {!isSubmitted && (
                <form className='edit-form' onSubmit={handleSubmit}>
                    <div className='edit-form-container'>
                        <div className='edit-form-input-container'>
                            <div className='edit-input-column-one'>
                                <div className='edit-input-container'>
                                    <label htmlFor='title'>Book Title</label>
                                    <input
                                        type='text'
                                        name='title'
                                        id='title'
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    {errors.title && (
                                        <span className='error-edit'>
                                            {errors.title}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='author'>Author</label>
                                    <input
                                        type='text'
                                        name='author'
                                        id='author'
                                        value={formData.author}
                                        onChange={handleChange}
                                    />
                                    {errors.author && (
                                        <span className='error-edit'>
                                            {errors.author}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
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
                                        <option value='Biography'>
                                            Biography
                                        </option>
                                        <option value='Historical'>
                                            Historical
                                        </option>
                                        <option value='Romance'>Romance</option>
                                        <option value='Thriller'>
                                            Thriller
                                        </option>
                                        <option value='Self-Help'>
                                            Self-Help
                                        </option>
                                        <option value='Horror'>Horror</option>
                                    </select>
                                    {errors.genre && (
                                        <span className='error-edit'>
                                            {errors.genre}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='publisher'>Publisher</label>
                                    <input
                                        type='text'
                                        name='publisher'
                                        id='publisher'
                                        value={formData.publisher}
                                        onChange={handleChange}
                                    />
                                    {errors.publisher && (
                                        <span className='error-edit'>
                                            {errors.publisher}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='isbn'>ISBN</label>
                                    <input
                                        type='text'
                                        name='isbn'
                                        id='isbn'
                                        value={formData.isbn}
                                        onChange={handleChange}
                                    />
                                    {errors.isbn && (
                                        <span className='error-edit'>
                                            {errors.isbn}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='edit-input-column-two'>
                                <div className='edit-input-container'>
                                    <label htmlFor='publicationDate'>
                                        Publication Date
                                    </label>
                                    <input
                                        type='date'
                                        name='publicationDate'
                                        id='publicationDate'
                                        value={formData.publicationDate}
                                        onChange={handleChange}
                                        ref={publicationDateRef}
                                        // onFocus={handleDateFocus}
                                    />
                                    {errors.publicationDate && (
                                        <span className='error-edit'>
                                            {errors.publicationDate}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='language'>Language</label>
                                    <input
                                        type='text'
                                        name='language'
                                        id='language'
                                        value={formData.language}
                                        onChange={handleChange}
                                    />
                                    {errors.language && (
                                        <span className='error-edit'>
                                            {errors.language}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='description'>
                                        Description
                                    </label>
                                    <textarea
                                        name='description'
                                        id='description'
                                        rows='4'
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    {errors.description && (
                                        <span className='error-edit'>
                                            {errors.description}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
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
                                        <span className='error-edit'>
                                            {errors.availableCopies}
                                        </span>
                                    )}
                                </div>
                                <div className='edit-input-container'>
                                    <label htmlFor='coverImage'>
                                        Cover Image
                                    </label>
                                    <div
                                        {...getRootProps()}
                                        className={`edit-dropzone ${
                                            isDragActive ? 'active' : ''
                                        }`}>
                                        <input {...getInputProps()} />
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt='Image Preview'
                                                className='image-preview'
                                            />
                                        ) : (
                                            <>
                                                <Upload size={32} />
                                                <p>
                                                    Drag & drop an image here,
                                                    or click to select an image
                                                    to update
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {errors.coverImage && (
                                        <span className='error-edit'>
                                            {errors.coverImage}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='edit-form-button-container'>
                            <button className='button-save' type='submit'>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
            <ModalComponent
                title={popupMessageTitle}
                isOpen={isModalOpen}
                imageSrc={popupImageSrc}
                messageBody={popupMessageBody}
                onClose={closeModal}
            />
        </div>
    )
}

export default EditBookComponent
