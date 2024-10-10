import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './SearchPageComponent.css'
// import SearchPageStyle from './SearchPageComponent.module.css'
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import BookCardComponent from '../BookCardComponent/BookCardComponent'
import LottieBookAnimation from '../AnimationComponents/LottieBookAnimation'
import LottieSearchNotFound from '../AnimationComponents/SearchNotFoundAnimation'
import Button from '../ButtonComponent/ButtonComponent'

// import SearchIcon3DAsset from '../../../assets/img/search_img-3d-asset.png'

function SearchPageComponent() {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')
    const [allBooks, setAllBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchCriteria, setSearchCriteria] = useState({
        genre: '',
        language: '',
        publisher: '',
    })

    useEffect(() => {
        const fetchAllBooks = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `http://localhost:3500/api/v1/book`
                )

                setAllBooks(response.data.books)
                setFilteredBooks(response.data.books)
                console.log('All Books', allBooks)
            } catch (error) {
                console.error('Error fetching books:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAllBooks()
    }, [])

    useEffect(() => {
        if (location.state?.query) {
            setSearchQuery(location.state.query)
        }
    }, [location.state])

    useEffect(() => {
        const applyFilters = () => {
            let updatedFilteredBooks = [...allBooks]

            if (searchQuery) {
                updatedFilteredBooks = updatedFilteredBooks.filter(
                    (book) =>
                        book.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        book.author
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                )
            }

            if (searchCriteria.genre) {
                updatedFilteredBooks = updatedFilteredBooks.filter(
                    (book) => book.genre === searchCriteria.genre
                )
            }

            if (searchCriteria.language) {
                updatedFilteredBooks = updatedFilteredBooks.filter(
                    (book) => book.language === searchCriteria.language
                )
            }

            if (searchCriteria.publisher) {
                updatedFilteredBooks = updatedFilteredBooks.filter(
                    (book) => book.publisher === searchCriteria.publisher
                )
            }

            setFilteredBooks(updatedFilteredBooks)
        }

        applyFilters()
    }, [searchQuery, searchCriteria, allBooks])

    const handleGenreChange = (e) => {
        const value = e.target.value
        setSearchCriteria((prev) => ({ ...prev, genre: value }))
    }

    const handleLanguageChange = (e) => {
        const value = e.target.value
        setSearchCriteria((prev) => ({ ...prev, language: value }))
    }

    const handlePublisherChange = (e) => {
        const value = e.target.value
        setSearchCriteria((prev) => ({ ...prev, publisher: value }))
    }

    const debounce = (func, delay) => {
        let timeoutId
        return function (...args) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func.apply(this, args), delay)
        }
    }

    const debouncedSearch = debounce((query) => {
        setSearchQuery(query)
        applyFilters()
    }, 300)

    const handleSearchChange = (query) => {
        if (query.trim()) {
            debouncedSearch(query)
        } else {
            setSearchQuery('')
            setFilteredBooks(allBooks)
        }
    }

    const clearAllFilters = () => {
        setSearchQuery('')
        setSearchCriteria({
            genre: '',
            language: '',
            publisher: '',
        })
        setFilteredBooks(allBooks)
    }

    return (
        <div className='search_page_outer_container'>
            <div className='search-heading'>
                {/* <img
                    src={SearchIcon3DAsset}
                    className='search_icon_3d'
                    alt='search_3d_icon'
                /> */}
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
                    <select
                        className='filter-select'
                        onChange={handleGenreChange}>
                        <option value=''>Select Genre</option>
                        <option value='Fiction'>Fiction</option>
                        <option value='Non Fiction'>Non-Fiction</option>
                    </select>
                    <select
                        className='filter-select'
                        onChange={handleLanguageChange}>
                        <option value=''>Select Language</option>
                        <option value='English'>English</option>
                        <option value='Tamil'>Tamil</option>
                        <option value='Spanish'>Spanish</option>
                    </select>
                    <select
                        className='filter-select'
                        onChange={handlePublisherChange}>
                        <option value=''>Select Publisher</option>
                        <option value='Penguin'>Penguin</option>
                        <option value='HarperCollins'>HarperCollins</option>
                    </select>
                </div>
                <div className='clear-button'>
                    <Button
                        onClick={clearAllFilters}
                        className='clear-filters-button'>
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
                            filteredBooks.length > 0
                                ? 'results-grid-layout'
                                : 'results-flex-layout'
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
