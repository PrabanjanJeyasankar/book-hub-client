import React, { useState, useEffect, useContext } from 'react'
import { FormDataContext } from '../../../context/FormContext/FormContext.jsx'
import ModalComponent from '../../SharedComponents/PopupComponents/InformationPopupComponent/InformationPopupComponent'
import BookFormComponent from '../../AdminComponents/BookFormComponent/BookFormComponent'
import validateBookForm from '../../../utils/formValidation'
import editBookService from '../../../services/editBookService'
import axiosInstance from '../../../utils/axiosInstance.js'

function EditBookFormComponent({ bookId }) {
    const { formData, setFormData } = useContext(FormDataContext)
    const [errors, setErrors] = useState({})
    const [popupImageSrc, setPopupImageSrc] = useState(null)
    const [popupMessageBody, setPopupMessageBody] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosInstance.get(`/book/${bookId}`)
                const book = response.data.book

                setFormData({
                    title: book.title || '',
                    author: book.author || '',
                    genre: book.genre || '',
                    publisher: book.publisher || '',
                    isbn: book.isbn || '',
                    publicationDate: book.publicationDate
                        ? book.publicationDate.split('T')[0]
                        : '',
                    language: book.language || '',
                    description: book.description || '',
                    availableCopies: book.availableCopies || '',
                    coverImage: book.coverImage || null,
                })

                if (book.coverImage) {
                    setImagePreview(book.coverImage)
                }
            } catch (error) {
                console.error('Error fetching book data:', error)
                setPopupMessageTitle('Error')
                setPopupMessageBody(
                    'Could not fetch book data. Please try again.'
                )
                setPopupImageSrc('errorImage')
                setIsModalOpen(true)
            }
        }

        fetchBookData()
    }, [bookId])

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview) // Clean up the URL if it's a local file
            }
        }
    }, [imagePreview])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validateBookForm(formData)
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await editBookService(formData, bookId)
                if (response.status === 200) {
                    const bookTitle =
                        response.data?.book?.title || 'Unknown Book'
                    setPopupImageSrc('successImage')
                    setPopupMessageTitle('Book Updated Successfully')
                    setPopupMessageBody(
                        `"${bookTitle}" has been updated successfully!`
                    )
                    setIsModalOpen(true)
                }
            } catch (error) {
                console.error('Error updating book:', error)
                setPopupImageSrc('errorImage')
                setPopupMessageTitle('Error')
                setPopupMessageBody(
                    'An error occurred while updating the book. Please try again.'
                )
                setIsModalOpen(true)
            }
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <BookFormComponent
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                errors={errors}
                title='Edit Book'
                imagePreview={imagePreview} // Pass the imagePreview prop if needed
                setImagePreview={setImagePreview} // Pass setImagePreview to handle file uploads
            />
            <ModalComponent
                popupMessageTitle={popupMessageTitle}
                popupImageSrc={popupImageSrc}
                popupMessageBody={popupMessageBody}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default EditBookFormComponent
