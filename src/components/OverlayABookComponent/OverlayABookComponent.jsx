import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './OverlayABookComponent.css'

function OverlayABookComponent({ bookData, onClose }) {
    const overlayRef = useRef(null)

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='overlay'>
            <div className='overlay-content' ref={overlayRef}>
                <div className='overlay-book-details'>
                    <img
                        src={`http://localhost:3500/api/v1/${bookData.coverImage}`}
                        alt={bookData.title}
                    />
                    <div className='overlay-details-action-container'>
                        <div className='overlay-book-info'>
                            <h3>{bookData.title}</h3>
                            <p>Author: {bookData.author}</p>
                            <p>Genre: {bookData.genre}</p>
                            <p>Description: {bookData.description}</p>
                            <p>Publisher: {bookData.publisher}</p>
                            <p>
                                Publication Date:{' '}
                                {new Date(bookData.publicationDate).toLocaleDateString()}
                            </p>
                            <p>Available Copies: {bookData.availableCopies}</p>
                        </div>
                        <div className='edit-details'>
                            <button className='edit-button'>Edit Book</button>
                        </div>
                    </div>
                </div>
                <button className='close-button' onClick={onClose}>
                    <X size={24} />
                </button>
            </div>
        </div>
    )
}

export default React.forwardRef(OverlayABookComponent)
