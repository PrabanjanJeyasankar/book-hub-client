import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useBooks } from '../../../context/BooksContext/BooksContext'
import './SearchPageComponent.css'
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import BookCardComponent from '../BookCardComponent/BookCardComponent'
import LottieBookAnimation from '../AnimationComponents/LottieBookAnimation'
import LottieSearchNotFound from '../AnimationComponents/SearchNotFoundAnimation'
import Button from '../ButtonComponent/ButtonComponent'
import useFilterBooks from '../../../hooks/useFilterBooks'
import useDebounce from '../../../hooks/useDebounce'

function SearchPageComponent() {
    const location = useLocation()
    const { allBooks } = useBooks()

    const [searchQuery, setSearchQuery] = useState('')
    const [searchCriteria, setSearchCriteria] = useState({
        genre: '',
        language: '',
        publisher: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const filteredBooks = useFilterBooks(allBooks, searchQuery, searchCriteria)

    useEffect(() => {
        if (location.state?.query) {
            setSearchQuery(location.state.query)
        }
    }, [location.state])

    const handleGenreChange = (e) => {
        setSearchCriteria((prev) => ({ ...prev, genre: e.target.value }))
    }

    const handleLanguageChange = (e) => {
        setSearchCriteria((prev) => ({ ...prev, language: e.target.value }))
    }

    const handlePublisherChange = (e) => {
        setSearchCriteria((prev) => ({ ...prev, publisher: e.target.value }))
    }

    const debouncedSearch = useDebounce((query) => {
        setSearchQuery(query)
    }, 300)

    const handleSearchChange = (query) => {
        if (query.trim()) {
            debouncedSearch(query)
        } else {
            setSearchQuery('')
        }
    }

    const clearAllFilters = () => {
        setSearchQuery('')
        setSearchCriteria({ genre: '', language: '', publisher: '' })
    }

    return (
        <div className='search_page_outer_container'>
            <div className='search-heading'>
                <h1 className='search-title'>Search</h1>
            </div>

            <p className='search-sub-heading'>
                Browse through our extensive collections.
            </p>

            <SearchBarComponent
                initialQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />

            <div className='filter-controls'>
                <div className='filter-container'>
                    <select className='filter-select' onChange={handleGenreChange}>
                        <option value=''>Select Genre</option>
                        <option value='Fiction'>Fiction</option>
                        <option value='Non Fiction'>Non-Fiction</option>
                    </select>
                    <select className='filter-select' onChange={handleLanguageChange}>
                        <option value=''>Select Language</option>
                        <option value='English'>English</option>
                        <option value='Tamil'>Tamil</option>
                        <option value='Spanish'>Spanish</option>
                    </select>
                    <select className='filter-select' onChange={handlePublisherChange}>
                        <option value=''>Select Publisher</option>
                        <option value='Penguin'>Penguin</option>
                        <option value='HarperCollins'>HarperCollins</option>
                    </select>
                </div>
                <div className='clear-button'>
                    <Button onClick={clearAllFilters} className='clear-filters-button'>
                        Clear Filters
                    </Button>
                </div>
            </div>

            <div className='search-result'>
                {isLoading ? (
                    <div className='loading-animation'>
                        <LottieBookAnimation className='book-animation' />
                        <p className='loading-text'>Loading...</p>
                    </div>
                ) : (
                    <div
                        className={`book-results ${
                            filteredBooks.length > 0 ? 'results-grid-layout' : 'results-flex-layout'
                        }`}>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <BookCardComponent key={index} book={book} />
                            ))
                        ) : (
                            <div className='search-not-found-Animation'>
                                <LottieSearchNotFound className='not-found-animation' />
                                <p className='not-found-text'>
                                    Oops...Couldn't find anything...
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPageComponent
