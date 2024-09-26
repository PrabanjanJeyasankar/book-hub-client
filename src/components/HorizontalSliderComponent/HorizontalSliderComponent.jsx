import React, { useState } from 'react';
import './HorizontalSliderComponent.css';
import BookCardComponent from '../BookCardComponent/BookCardComponent';
import BookCoverImage1 from '../../assets/img/img1.png'
import BookCoverImage2 from '../../assets/img/img2.png'
import BookCoverImage3 from '../../assets/img/img3.png'
import BookCoverImage4 from '../../assets/img/img4.png'
import BookCoverImage5 from '../../assets/img/img5.png'
import BookCoverImage6 from '../../assets/img/img6.png'
import BookCoverImage7 from '../../assets/img/img7.png'
import BookCoverImage8 from '../../assets/img/img8.png'
import BookCoverImage9 from '../../assets/img/img9.png'
import BookCoverImage10 from '../../assets/img/img10.png'

const HorizontalSliderComponent = () => {

    const data = [
        {
            id: 1,
            bookTitle: 'Game of Thrones',
            bookAuthor: 'George R.R. Martin',
            coverImage: BookCoverImage1,
            category: 'popular',
        },
        {
            id: 2,
            bookTitle: 'Sivappukkal Mookkuthi',
            bookAuthor: 'Kannadasan',
            coverImage: BookCoverImage4,
            category: 'best seller',
        },
        {
            id: 3,
            bookTitle: '1984',
            bookAuthor: 'George Orwell',
            coverImage: BookCoverImage3,
            category: 'popular',
        },
        {
            id: 4,
            bookTitle: 'The Hobbit',
            bookAuthor: 'J.R.R. Tolkien',
            coverImage: BookCoverImage2,
            category: 'best seller',
        },
        {
            id: 5,
            bookTitle: 'The Great Gatsby',
            bookAuthor: 'F. Scott Fitzgerald',
            coverImage: BookCoverImage5,
            category: 'popular',
        },
        {
            id: 6,
            bookTitle: 'Moby-Dick',
            bookAuthor: 'Herman Melville',
            coverImage: BookCoverImage6,
            category: 'best seller',
        },
        {
            id: 7,
            bookTitle: 'War and Peace',
            bookAuthor: 'Leo Tolstoy',
            coverImage: BookCoverImage7,
            category: 'popular',
        },
        {
            id: 8,
            bookTitle: 'Thaamirabaraniyil Kollappadadhavargal',
            bookAuthor: 'Mari Selvaraj',
            coverImage: BookCoverImage8,
            category: 'best seller',
        },
        {
            id: 9,
            bookTitle: 'The Catcher in the Rye',
            bookAuthor: 'J.D. Salinger',
            coverImage: BookCoverImage9,
            category: 'popular',
        },
        {
            id: 10,
            bookTitle: 'The Lord of the Rings',
            bookAuthor: 'J.R.R. Tolkien',
            coverImage: BookCoverImage10,
            category: 'best seller',
        },
    ]
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    setScrollPosition(scrollPosition - 300);
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 300);
  };

  return (
    <div className='slider-container'>
      <button className='slider-btn left' onClick={scrollLeft}>
        &#60;
      </button>
      <div className='slider'>
        <div
          className='slider-wrapper'
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {data.map((book, index) => (
            <div key={index} className='slider-item'>
              <BookCardComponent book={book} />
            </div>
          ))}
        </div>
      </div>
      <button className='slider-btn right' onClick={scrollRight}>
        &#62;
      </button>
    </div>
  );
};

export default HorizontalSliderComponent;
