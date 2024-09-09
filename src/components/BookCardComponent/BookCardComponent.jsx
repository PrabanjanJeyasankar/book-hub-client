import React from 'react'
import './BookCardComponent.css'

function BookCardComponent({ book }) {
    return (
        <React.Fragment>
            <div className='book-card'>
                <img className='book-cover' src={book.bookCoverImage} alt={book.bookTitle} />
                <div className='book-details'>
                    <h3 className='book-title'>{book.bookTitle}</h3>
                    <p className='book-author'>{book.bookAuthor}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookCardComponent
