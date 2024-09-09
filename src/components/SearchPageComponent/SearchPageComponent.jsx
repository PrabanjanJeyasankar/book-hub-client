import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function SearchPageComponent() {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')

    // Use useEffect to set the searchQuery from the passed state
    useEffect(() => {
        if (location.state?.query) {
            setSearchQuery(location.state.query)
        }
    }, [location.state])

    return (
        <div>
            <h1>Search Results</h1>
            {/* Show the search bar with the search query */}
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for books, authors, or genres...'
            />
            {/* Render search results based on searchQuery */}
            <p>Showing results for: "{searchQuery}"</p>
        </div>
    )
}

export default SearchPageComponent
