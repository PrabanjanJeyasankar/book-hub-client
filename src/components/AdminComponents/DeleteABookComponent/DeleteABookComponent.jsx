import React, { useEffect, useState } from 'react'
import InformationPopupComponent from '../../SharedComponents/PopupComponents/InformationPopupComponent/InformationPopupComponent'
import axiosInstance from '../../../utils/axiosInstance'

function DeleteBookComponent({ bookData, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [popupImageSrc, setPopupImageSrc] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [popupMessageBody, setPopupMessageBody] = useState('')

    const handleDelete = async () => {
        console.log('Delete triggered')
        if (!bookData) {
            console.error('No bookData provided for deletion.')
            return
        }
        try {
            const response = await axiosInstance.delete(
                `/book/delete/${bookData.isbn}`
            )
            console.log('Delete response:', response)
            if (response.status === 200) {
                // console.log('200')
                // console.log('Delete triggered')
                setPopupImageSrc('deleteImage')
                setPopupMessageTitle('Book Deleted Successfully')
                setPopupMessageBody(
                    `"${bookData.title}" has been deleted successfully!`
                )

                setIsModalOpen(true)
            } else {
                setPopupImageSrc('errorImage')
                setPopupMessageTitle('Unexpected Status Code')
                setPopupMessageBody(
                    'An unexpected error occurred while deleting the book. Please try again later.'
                )
                setIsModalOpen(true)
            }
        } catch (error) {
            console.error('Error Message:', error.message)
            if (error.response) {
                if (error.response.status === 404) {
                    setPopupImageSrc('errorImage')
                    setPopupMessageTitle('Book Not Found')
                    setPopupMessageBody(
                        `The book "${bookData.title}" could not be found.`
                    )
                } else {
                    setPopupImageSrc('errorImage')
                    setPopupMessageTitle('An Unexpected Error Occurred')
                    setPopupMessageBody(
                        'An unexpected error occurred while deleting the book. Please try again later.'
                    )
                }
            } else {
                setPopupImageSrc('errorImage')
                setPopupMessageTitle('An Unexpected Error Occurred')
                setPopupMessageBody(
                    'An unexpected error occurred while deleting the book. Please check your network connection and try again.'
                )
            }

            setIsModalOpen(true)
        }
    }

    if (onDelete) {
        handleDelete()
    }

    return (
        <div className='delete-book-component'>
            <InformationPopupComponent
                popupImageSrc={popupImageSrc}
                popupMessageTitle={popupMessageTitle}
                popupMessageBody={popupMessageBody}
                isOpen={isModalOpen}
            />
        </div>
    )
}

export default DeleteBookComponent
