import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllBooksComponent.css';

function AllBooksComponent() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/v1/book/');
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
        
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // const fetchGenres = async () => {
    //   try {
    //     const response = await axios.get('/api/genres'); 
    //     setGenres(response.data.genres);
    //   } catch (error) {
    //     console.error('Error fetching genres:', error);
    //   }
    // };

    fetchBooks();
    // fetchGenres();
  }, []);

  // useEffect(() => {
  //   const filtered = books.filter(book => {
  //     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
  //     return matchesSearch && matchesGenre;
  //   });
  //   setFilteredBooks(filtered);
  // }, [searchTerm, selectedGenre, books]);

  return (
    <div className="all-books-component">
      {/* <div className="filter-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div> */}
      <div className="books-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.isbn} className="book-item">
            <img src={`http://localhost:3500/api/v1/${book.coverImage}`} alt={book.title} className="book-cover" />
            <div className="book-details">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
                <p>Available Copies: {book.availableCopies}</p>
                <p>{book.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default AllBooksComponent;
