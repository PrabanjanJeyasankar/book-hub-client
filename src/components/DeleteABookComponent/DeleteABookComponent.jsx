import React, { useState } from 'react'
import axios from 'axios'
import ModalComponent from '../ModalComponent/ModalComponent'
import greenTick from '../../assets/img/accept.png'
import redWarning from '../../assets/img/warning.png'

function DeleteBookComponent({ bookData, onClose, onBookDeleted }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [popupImageSrc, setPopupImageSrc] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [popupMessageBody, setPopupMessageBody] = useState('')

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/api/v1/book/delete/${bookData.isbn}`)
            
            if (response.status === 200) {
                setPopupImageSrc(greenTick)
                setPopupMessageTitle('Book Deleted Successfully')
                setPopupMessageBody(`"${bookData.title}" has been deleted successfully!`)
                
                onBookDeleted()
                onClose()
            } else {
                setPopupImageSrc(redWarning)
                setPopupMessageTitle('Unexpected Status Code')
                setPopupMessageBody('An unexpected error occurred while deleting the book. Please try again later.')
            }

            setIsModalOpen(true)
        } catch (error) {
            console.log('Error Message:', error.message)
            console.log('Error Response Status:', error.response ? error.response.status : 'No response')
            console.log('Error Response Data:', error.response ? error.response.data : 'No response data')

            if (error.response) {
                if (error.response.status === 404) {
                    setPopupImageSrc(redWarning)
                    setPopupMessageTitle('Book Not Found')
                    setPopupMessageBody(`The book "${bookData.title}" could not be found.`)
                } else {
                    setPopupImageSrc(redWarning)
                    setPopupMessageTitle('An Unexpected Error Occurred')
                    setPopupMessageBody('An unexpected error occurred while deleting the book. Please try again later.')
                }
            } else {
                setPopupImageSrc(redWarning)
                setPopupMessageTitle('An Unexpected Error Occurred')
                setPopupMessageBody('An unexpected error occurred while deleting the book. Please check your network connection and try again.')
            }

            setIsModalOpen(true)
        }
    }

    return (
        <div className='delete-book-component'>
            <button className='delete-button' onClick={handleDelete}>
                Delete Book
            </button>
            <ModalComponent
                popupImageSrc={popupImageSrc}
                popupMessageTitle={popupMessageTitle}
                popupMessageBody={popupMessageBody}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default DeleteBookComponent
