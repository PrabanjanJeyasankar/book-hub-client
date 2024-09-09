import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import './SearchBarComponent.css'

function SearchBarComponent() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault() // Prevent the form from refreshing the page

        // Navigate to the SearchPageComponent with the search query as a state
        if (searchQuery.trim()) {
            navigate('/search', { state: { query: searchQuery } })
        }
    }

    return (
        <div className='search-container'>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='search-form-elem'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='books, authors, or genres...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state
                    />
                    <button type='submit' className='search-icon'>
                        <Search />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBarComponent
