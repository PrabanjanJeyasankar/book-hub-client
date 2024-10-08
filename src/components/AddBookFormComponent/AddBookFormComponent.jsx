import React, { useState } from 'react'
import InformationPopupComponent from '../PopupComponents/InformationPopupComponent/InformationPopupComponent'
import BookFormComponent from '../BookFormComponent/BookFormComponent'
import validateBookForm from '../../utils/formValidation.js'
import addBookService from '../../services/addBookService.js'

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
        coverImage: null,
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState({})
    const [popupImageSrc, setPopupImageSrc] = useState(null)
    const [popupMessageBody, setPopupMessageBody] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const formErrors = validateBookForm(formData)
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            addBookService(formData)
                .then((response) => {
                    console.log(response.status)
                    if (response.status == 201) {
                        setPopupMessageTitle('Success')
                        setPopupMessageBody(
                            `"${
                                response.data?.book?.title || 'Unknown Book'
                            }" has been added successfully!`
                        )
                        setPopupImageSrc('successImage')
                    }
                })
                .catch((error) => {
                    console.log(error.response.status)
                    switch (error.response.status) {
                        case 400:
                            setPopupMessageTitle('Validation Error')
                            setPopupMessageBody(
                                'Please check your input and try again.'
                            )
                            setPopupImageSrc('errorImage')
                            break
                        case 409:
                            setPopupMessageTitle('Book Already Exist')
                            setPopupMessageBody(
                                'This Book has already been added!'
                            )
                            setPopupImageSrc('errorImage')
                            break
                        case 500:
                            setPopupMessageTitle('Server Error')
                            setPopupMessageBody(
                                'There was a server error. Please try again later.'
                            )
                            setPopupImageSrc('errorImage')
                            break
                        default:
                            setPopupMessageTitle('Unknown Error')
                            setPopupMessageBody(
                                'An unexpected error occurred. Please try again.'
                            )
                            setPopupImageSrc('errorImage')
                            break
                    }
                })
                .finally(() => {
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
                title='Add New Book'
            />
            <InformationPopupComponent
                popupMessageTitle={popupMessageTitle}
                popupMessageBody={popupMessageBody}
                popupImageSrc={popupImageSrc}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default AddBookFormComponent
