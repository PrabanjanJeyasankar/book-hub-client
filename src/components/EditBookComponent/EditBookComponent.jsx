import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ModalComponent from '../PopupComponents/InformationPopupComponent/InformationPopupComponent'
import BookFormComponent from '../BookFormComponent/BookFormComponent'
import successImage from '../../assets/img/accept.png'
import errorImage from '../../assets/img/mark.png'
import validateBookForm from '../../utils/formValidation'
import editBookService from '../../services/editBookService'

function EditBookFormComponent({ bookId }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        publisher: '',
        isbn: '',
        publicationDate: '',
        language: '',
        description: '',
        availableCopies: '',
        coverImage: null,
    })
    const [errors, setErrors] = useState({})
    const [popupImageSrc, setPopupImageSrc] = useState(null)
    const [popupMessageBody, setPopupMessageBody] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3500/api/v1/book/${bookId}`
                )
                const book = response.data.book

                setFormData({
                    title: book.title || '',
                    author: book.author || '',
                    genre: book.genre || '',
                    publisher: book.publisher || '',
                    isbn: book.isbn || '',
                    publicationDate: book.publicationDate || '',
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
            }
        }

        fetchBookData()
    }, [bookId])
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview) // Clean up the URL
            }
        }
    }, [imagePreview])
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validateBookForm(formData)
        console.log(formErrors)
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            editBookService(formData)
                .then((response) => {
                    if (response.status == 200) {
                        const bookTitle =
                            response.data?.book?.title || 'Unknown Book'
                        setPopupImageSrc(successImage)
                        setPopupMessageTitle('Book Updated Successfully')
                        setPopupMessageBody(
                            `"${bookTitle}" has been updated successfully!`
                        )
                    }
                })
                .catch((error) => {
                    console.error('Error updating book:', error)
                    setPopupImageSrc(errorImage)
                    setPopupMessageTitle('Error')
                    setPopupMessageBody(
                        'An error occurred while updating the book.'
                    )
                    setIsModalOpen(true)
                })
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
            />
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

export default EditBookFormComponent
