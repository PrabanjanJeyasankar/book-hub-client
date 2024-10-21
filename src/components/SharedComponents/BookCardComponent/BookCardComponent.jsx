import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import OverlayABookComponent from '../OverlayABookComponent/OverlayABookComponent'
import './BookCardComponent.css'

function BookCardComponent({ book }) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(true)

    useEffect(() => {
        const image = new Image()
        image.src = book.coverImage
        image.onload = () => setIsImageLoading(false)
        image.onerror = () => setIsImageLoading(false)
    }, [book.coverImage])

    const handleCardClick = () => {
        setShowOverlay(true)
    }

    const handleCloseOverlay = () => {
        setShowOverlay(false)
    }

    return (
        <React.Fragment>
            <div className='book-card' onClick={handleCardClick}>
                {isImageLoading ? (
                    <div className='book-details'>
                        <div className='loader-container'>
                            <div className='book-cover loader'></div>
                        </div>
                        <h3 className='book-title'>{book.title}</h3>
                        <p className='book-author'>by {book.author}</p>
                    </div>
                ) : (
                    <>
                        <div className='book-details'>
                            <img
                                className='book-cover'
                                src={book.coverImage}
                                alt={book.title}
                                loading='lazy'
                            />
                            <h3 className='book-title'>{book.title}</h3>
                            <p className='book-author'>by {book.author}</p>
                        </div>
                    </>
                )}
            </div>
            {showOverlay &&
                ReactDOM.createPortal(
                    <OverlayABookComponent
                        book={book}
                        onClose={handleCloseOverlay}
                    />,
                    document.body
                )}
        </React.Fragment>
    )
}

export default BookCardComponent
