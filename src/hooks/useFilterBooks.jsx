import { useState, useEffect } from "react";

const useFilterBooks = (allBooks, searchQuery, searchCriteria) => {
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let updatedFilteredBooks = [...allBooks];

      if (searchQuery) {
        updatedFilteredBooks = updatedFilteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      if (searchCriteria.genre) {
        updatedFilteredBooks = updatedFilteredBooks.filter(
          (book) => book.genre === searchCriteria.genre,
        );
      }

      if (searchCriteria.language) {
        updatedFilteredBooks = updatedFilteredBooks.filter(
          (book) => book.language === searchCriteria.language,
        );
      }

      if (searchCriteria.publisher) {
        updatedFilteredBooks = updatedFilteredBooks.filter(
          (book) => book.publisher === searchCriteria.publisher,
        );
      }

      setFilteredBooks(updatedFilteredBooks);
    };

    applyFilters();
  }, [allBooks, searchQuery, searchCriteria]);

  return filteredBooks;
};

export default useFilterBooks;
