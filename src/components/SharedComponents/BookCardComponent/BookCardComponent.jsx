import React, { useState, useEffect } from 'react' 
import ReactDOM from 'react-dom' 
import OverlayABookComponent from '../OverlayABookComponent/OverlayABookComponent' 
import './BookCardComponent.css' 
 
export default function BookCardComponent({ book }) { 
  const [showOverlay, setShowOverlay] = useState(false) 
  const [isLoading, setIsLoading] = useState(true) 
 
  useEffect(() => { 
    const image = new Image() 
    image.src = book.coverImage 
    image.onload = () => setIsLoading(false) 
  }, [book.coverImage]) 
 
  const handleCardClick = () => { 
    setShowOverlay(true) 
  } 
 
  const handleCloseOverlay = () => { 
    setShowOverlay(false) 
  } 
 
  return ( 
    <React.Fragment> 
      <div className={`book-card ${isLoading ? 'loading' : ''}`} onClick={handleCardClick}> 
        {isLoading ? ( 
          <div className="book-card-skeleton"> 
            <div className="skeleton-image" /> 
            <div className="skeleton-details"> 
              <div className="skeleton-title" /> 
              <div className="skeleton-author" /> 
            </div> 
          </div> 
        ) : ( 
          <> 
            <img 
              className='book-cover' 
              src={book.coverImage} 
              alt={book.title} 
            /> 
            <div className='book-details'> 
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