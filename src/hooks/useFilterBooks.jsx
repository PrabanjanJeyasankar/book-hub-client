import { useState, useEffect } from 'react'

const useFilterBooks = (allBooks, searchQuery, searchCriteria) => {
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        const applyFilters = () => {
            let updatedFilteredBooks = [...allBooks]

            // Applied the search query filter (ONLY on title and author)
            // And only when query matches the beginning of a word
            if (searchQuery) {
                const lowerCaseQuery = searchQuery.toLowerCase().trim()
                
                updatedFilteredBooks = updatedFilteredBooks.filter((book) => {
                    // For title: check if any word starts with the query
                    const titleWords = book.title.toLowerCase().split(/\s+/)
                    const titleMatch = titleWords.some(word => 
                        word.startsWith(lowerCaseQuery)
                    )
                    
                    // For author: check if any word starts with the query
                    const authorWords = book.author.toLowerCase().split(/\s+/)
                    const authorMatch = authorWords.some(word => 
                        word.startsWith(lowerCaseQuery)
                    )
                    
                    return titleMatch || authorMatch
                })
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
    }, [allBooks, searchQuery, searchCriteria])

    return filteredBooks
}

export default useFilterBooks