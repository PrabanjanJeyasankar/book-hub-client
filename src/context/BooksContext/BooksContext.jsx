import React, { createContext, useContext, useState, useEffect } from 'react'
import fetchAllBooksService from '../../services/fetchAllBooksService'

const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await fetchAllBooksService()
                setAllBooks(books)
            } catch (error) {
                console.error('Failed to fetch books:', error)
            }
        }

        fetchBooks()
    }, [])

    return (
        <BooksContext.Provider value={{ allBooks }}>
            {children}
        </BooksContext.Provider>
    )
}

export const useBooks = () => useContext(BooksContext)
