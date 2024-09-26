import React, { useState } from 'react';
import OverlayABookComponent from '../OverlayABookComponent/OverlayABookComponent';
import './BookCardComponent.css';

function BookCardComponent({ book }) {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleCardClick = () => {
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <React.Fragment>
            <div className='book-card' onClick={handleCardClick}>
                <img
                    className='book-cover'
                    src={`http://localhost:3500/api/v1${book.coverImage}`}
                    alt={book.title}
                />
                <div className='book-details'>
                    <h3 className='book-title'>{book.title}</h3>
                    <p className='book-author'>{book.author}</p>
                </div>
            </div>
            {showOverlay && (
                <OverlayABookComponent
                    bookData={book}
                    onClose={handleCloseOverlay}
                />
            )}
        </React.Fragment>
    );
}

export default BookCardComponent;
