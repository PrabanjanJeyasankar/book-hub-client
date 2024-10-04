import React, { useState, useRef, useEffect } from 'react'
import './CardSliderComponent.css'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import BookCardComponent from '../BookCardComponent/BookCardComponent'

function CardSliderComponent({ books }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cardWidth = 250
    const [booksToShow, setBooksToShow] = useState(3)
    const sliderRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = sliderRef.current?.clientWidth || 0
            const newBooksToShow = Math.floor(containerWidth / cardWidth)

            setBooksToShow(newBooksToShow)
            setCurrentIndex(0)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalCards = books.length

    const handleNext = () => {
        if (currentIndex < totalCards - booksToShow) {
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1)
        }
    }

    if (!Array.isArray(books) || books.length === 0) {
        return <div className='no-books'>No books available.</div>
    }

    return (
        <div className='slider-container'>
            <button
                className='nav-button prev'
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label='Previous book'>
                <ChevronLeft size={42} />
            </button>
            <div className='slider' ref={sliderRef}>
                <div
                    className='slider-content'
                    style={{
                        transform: `translateX(-${currentIndex * cardWidth}px)`,
                        width: `${totalCards * cardWidth}px`,
                    }}>
                    {books.map((book, index) => (
                        <div
                            key={book.id || index}
                            className='slide'
                            style={{ width: `${cardWidth}px` }}>
                            <BookCardComponent key={book.id} book={book} />
                        </div>
                    ))}
                </div>
            </div>
            <button
                className='nav-button next'
                onClick={handleNext}
                disabled={currentIndex >= totalCards - booksToShow}
                aria-label='Next book'>
                <ChevronRight size={42} />
            </button>
        </div>
    )
}

export default CardSliderComponent
