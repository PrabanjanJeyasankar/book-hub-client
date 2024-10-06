import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ModalComponent from '../PopupComponents/InformationPopupComponent/InformationPopupComponent'
import BookFormComponent from '../BookFormComponent/BookFormComponent'
import greenTick from '../../assets/img/accept.png'
import redWarning from '../../assets/img/mark.png'

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

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3500/api/v1/book/${bookId}`
                )
                setFormData(response.data)
            } catch (error) {
                console.error('Error fetching book data:', error)
            }
        }

        fetchBookData()
    }, [bookId])

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            const data = new FormData()
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key])
            })

            try {
                const response = await axios.put(
                    `http://localhost:3500/api/v1/book/edit/${bookId}`,
                    data,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                )

                if (response.status === 200) {
                    const bookTitle =
                        response.data?.book?.title || 'Unknown Book'
                    setPopupImageSrc(successImage)
                    setPopupMessageTitle('Book Updated Successfully')
                    setPopupMessageBody(
                        `"${bookTitle}" has been updated successfully!`
                    )
                } else {
                    setPopupImageSrc(errorImage)
                    setPopupMessageTitle('Error')
                    setPopupMessageBody(
                        'An error occurred while updating the book.'
                    )
                }
                setIsModalOpen(true)
            } catch (error) {
                console.error('Error updating book:', error)
                setPopupImageSrc(errorImage)
                setPopupMessageTitle('Error')
                setPopupMessageBody(
                    'An error occurred while updating the book.'
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
