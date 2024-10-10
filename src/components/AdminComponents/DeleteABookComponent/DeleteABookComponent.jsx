import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InformationPopupComponent from '../../SharedComponents/PopupComponents/InformationPopupComponent/InformationPopupComponent'

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
            const response = await axios.delete(
                `http://localhost:3500/api/v1/book/delete/${bookData.isbn}`
            )
            console.log('Delete response:', response)
            if (response.status === 200) {
                console.log('200')
                console.log('Delete triggered')
                setPopupImageSrc('success')
                setPopupMessageTitle('Book Deleted Successfully')
                setPopupMessageBody(
                    `"${bookData.title}" has been deleted successfully!`
                )

                setIsModalOpen(true)
            } else {
                setPopupImageSrc('error')
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
                    setPopupImageSrc('redWarning.png')
                    setPopupMessageTitle('Book Not Found')
                    setPopupMessageBody(
                        `The book "${bookData.title}" could not be found.`
                    )
                } else {
                    setPopupImageSrc('error')
                    setPopupMessageTitle('An Unexpected Error Occurred')
                    setPopupMessageBody(
                        'An unexpected error occurred while deleting the book. Please try again later.'
                    )
                }
            } else {
                setPopupImageSrc('error')
                setPopupMessageTitle('An Unexpected Error Occurred')
                setPopupMessageBody(
                    'An unexpected error occurred while deleting the book. Please check your network connection and try again.'
                )
            }

            setIsModalOpen(true)
        }
    }

    useEffect(() => {
        if (onDelete) {
            handleDelete()
        }
    }, [onDelete])

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
