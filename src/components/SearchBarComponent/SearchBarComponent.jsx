import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './HeroPageStyling.css'
import './SearchPageStyling.css'

function SearchBarComponent({
    stlyingClassName,
    initialQuery = '',
    onSearchChange,
}) {
    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const navigate = useNavigate()

    useEffect(() => {
        setSearchQuery(initialQuery)
    }, [initialQuery])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (searchQuery.trim()) {
            navigate('/search', { state: { query: searchQuery } })
        }
    }

    const handleSearchQuery = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        onSearchChange(value)
    }

    return (
        <div className={`search-container ${stlyingClassName}`}>
            <form className='search-form' onSubmit={handleSubmit}>
                <div className='search-form-elem'>
                    <button type='submit' className='search-icon'>
                        <Search />
                    </button>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='books, authors, or genres...'
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBarComponent
