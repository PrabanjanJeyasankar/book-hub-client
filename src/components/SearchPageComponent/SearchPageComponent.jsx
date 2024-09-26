import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './SearchPageComponent.css'
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import axios from 'axios'
import BookCardComponent from '../BookCardComponent/BookCardComponent'
// import searchIconImage from '../../assets/img/search_img-3d-asset.png'
// import Lottie from 'lottie-web'
// import BookLoadingAnimation from '../../assets/animation/book_loading_animation.json'
import LottieBookAnimation from '../AnimationComponents/LottieBookAnimation'
import LottieSearchNotFound from '../AnimationComponents/SearchNotFoundAnimation'
function SearchPageComponent() {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (location.state?.query) {
            setSearchQuery(location.state.query)
        }
    }, [location.state])

    useEffect(() => {
        if (searchQuery) {
            const fetchData = async () => {
                setIsLoading(true)
                setError(null)

                try {
                    // Replace with your backend API endpoint
                    const response = await axios.get(
                        `http://localhost:3500/api/v1/book/search?query=${searchQuery}`
                    )
                    setSearchResults(response.data.books) // Set search results
                    console.log(response.data)
                } catch (err) {
                    setError('Error fetching search results.')
                } finally {
                    setIsLoading(false)
                }
            }

            fetchData()
        }
    }, [searchQuery])

    return (
        <div className='search-page-outer-container'>
            <div className='search-heading'>
                <h1 className='search-title'>Search</h1>
            </div>

            <p className='search-sub-heading'>
                Browse through our extensive collections.
            </p>

            <SearchBarComponent
                stlyingClassName='search-page-bar'
                initialQuery={searchQuery}
            />

            <div className='search-result'>
                {isLoading ? (
                    <div className='loading-animation'>
                        <LottieBookAnimation className='book-animation' />
                        <p className='loading-text'>Loading...</p>
                    </div>
                ) : null}

                <div
                    className={`book-results ${
                        searchResults && searchResults.length > 0
                            ? 'results-grid-layout'
                            : 'results-flex-layout'
                    }`}>
                    {searchResults && searchResults.length > 0
                        ? searchResults.map((book, index) => (
                              <BookCardComponent key={index} book={book} />
                          ))
                        : !isLoading && (
                              <div className='search-not-found-Animation'>
                                  <LottieSearchNotFound className='not-found-animation' />
                                  <p className='not-found-text'>
                                      Couldn't find anything for "{searchQuery}"
                                  </p>
                              </div>
                          )}
                </div>
            </div>
        </div>
    )
}

export default SearchPageComponent
