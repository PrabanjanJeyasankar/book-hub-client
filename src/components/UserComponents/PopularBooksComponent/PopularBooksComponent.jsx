import React, { useEffect, useState } from "react";
import "./PopularBooksComponent.css";
import CardSliderComponent from "../CardSliderComponent/CardSliderComponent";
import axiosInstance from "../../../utils/axiosInstance";
import PageLoadingAnimation from "../../SharedComponents/PageLoadingAnimation/PageLoadingAnimation";

function PopularBooksComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/book/");
        setBooks(response.data.books);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div>
        <PageLoadingAnimation />{" "}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books || books.length === 0) {
    return <div>No books available.</div>;
  }

  return (
    <div className="popular-books">
      <h2 className="popular-books-title">Popular Books</h2>
      <CardSliderComponent books={books} />
    </div>
  );
}

export default PopularBooksComponent;
