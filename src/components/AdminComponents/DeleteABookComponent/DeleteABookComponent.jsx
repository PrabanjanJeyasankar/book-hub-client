import { useEffect, useState } from 'react'
import InformationPopupComponent from '../../SharedComponents/PopupComponents/InformationPopupComponent/InformationPopupComponent'
import axiosInstance from '../../../utils/axiosInstance'
import { useBooks } from '../../../context/BooksContext/BooksContext'

function DeleteBookComponent({ bookData }) {
    const { removeBookFromAllBooks } = useBooks()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [popupImageSrc, setPopupImageSrc] = useState('')
    const [popupMessageTitle, setPopupMessageTitle] = useState('')
    const [popupMessageBody, setPopupMessageBody] = useState('')

    const handleDelete = async () => {
        if (!bookData) {
            return
        }
        try {
            const response = await axiosInstance.delete(
                `/book/delete/${bookData.isbn}`
            )
            if (response.status === 200) {
                removeBookFromAllBooks(bookData._id)
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

    useEffect(() => {
        handleDelete()
    }, [bookData])

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
