import React from 'react'
import './BookCardComponent.css'

function BookCardComponent({book}) {
  return (
   <React.Fragment>
    <div className="book-card">
      <img src={book.bookCoverImage} alt={book.bookTitle} />
      <h3>{book.bookTitle}</h3>
      <p>{book.bookAuthor}</p>
    </div>
   </React.Fragment>
  )
}

export default BookCardComponent