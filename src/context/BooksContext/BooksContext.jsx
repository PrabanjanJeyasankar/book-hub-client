import React, { createContext, useContext, useState, useEffect } from "react";
import fetchAllBooksService from "../../services/fetchAllBooksService";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await fetchAllBooksService();
        setAllBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const removeBookFromAllBooks = (bookId) => {
    // console.log('Trying to remove book with ID:', bookId)
    setAllBooks((prevBooks) =>
      prevBooks.filter((book) => {
        // console.log('Current book ID:', book._id)
        return book._id !== bookId;
      }),
    );
  };

  return (
    <BooksContext.Provider value={{ allBooks, removeBookFromAllBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
