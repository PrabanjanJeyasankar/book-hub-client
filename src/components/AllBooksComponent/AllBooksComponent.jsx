import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './AllBooksComponent.css'
import OverlayABookComponent from '../OverlayABookComponent/OverlayABookComponent'

function AllBooksComponent() {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('All')
    const [genres, setGenres] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3500/api/v1/book/'
                )
                setBooks(response.data.books)
                setFilteredBooks(response.data.books)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }
        fetchBooks()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                overlayRef.current &&
                !overlayRef.current.contains(event.target)
            ) {
                handleCloseOverlay()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClick = (book) => {
        setSelectedBook(book)
        setIsOverlayVisible(true)
    }

    const handleCloseOverlay = () => {
        setIsOverlayVisible(false)
        setSelectedBook(null)
    }

    return (
        <div className='all-books-container'>
            <div className='books-list'>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div
                            key={book.isbn}
                            className='book-item'
                            onClick={() => handleClick(book)}>
                            <img
                                src={`http://localhost:3500/api/v1/${book.coverImage}`}
                                alt={book.title}
                            />
                            <div className='book-details'>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
            {isOverlayVisible && selectedBook && (
                <div>
                    <OverlayABookComponent
                        bookData={selectedBook}
                        onClose={handleCloseOverlay}
                    />
                </div>
            )}
        </div>
    )
}

export default AllBooksComponent
