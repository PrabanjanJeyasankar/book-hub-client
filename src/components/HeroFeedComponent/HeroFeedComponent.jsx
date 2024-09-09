import React from 'react'
import './HeroFeedComponent.css'
import BookCardComponent from '../BookCardComponent/BookCardComponent'
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

const data = [
    {
        id: 1,
        bookTitle: 'Game of Thrones',
        bookAuthor: 'George R.R. Martin',
        bookCoverImage: BookCoverImage1,
        category: 'popular',
    },
    {
        id: 2,
        bookTitle: 'Sivappukkal Mookkuthi',
        bookAuthor: 'Kannadasan',
        bookCoverImage: BookCoverImage4,
        category: 'best seller',
    },
    {
        id: 3,
        bookTitle: '1984',
        bookAuthor: 'George Orwell',
        bookCoverImage: BookCoverImage3,
        category: 'popular',
    },
    {
        id: 4,
        bookTitle: 'The Hobbit',
        bookAuthor: 'J.R.R. Tolkien',
        bookCoverImage: BookCoverImage2,
        category: 'best seller',
    },
    {
        id: 5,
        bookTitle: 'The Great Gatsby',
        bookAuthor: 'F. Scott Fitzgerald',
        bookCoverImage: BookCoverImage5,
        category: 'popular',
    },
    {
        id: 6,
        bookTitle: 'Moby-Dick',
        bookAuthor: 'Herman Melville',
        bookCoverImage: BookCoverImage6,
        category: 'best seller',
    },
    {
        id: 7,
        bookTitle: 'War and Peace',
        bookAuthor: 'Leo Tolstoy',
        bookCoverImage: BookCoverImage7,
        category: 'popular',
    },
    {
        id: 8,
        bookTitle: 'Thaamirabaraniyil Kollappadadhavargal',
        bookAuthor: 'Mari Selvaraj',
        bookCoverImage: BookCoverImage8,
        category: 'best seller',
    },
    {
        id: 9,
        bookTitle: 'The Catcher in the Rye',
        bookAuthor: 'J.D. Salinger',
        bookCoverImage: BookCoverImage9,
        category: 'popular',
    },
    {
        id: 10,
        bookTitle: 'The Lord of the Rings',
        bookAuthor: 'J.R.R. Tolkien',
        bookCoverImage: BookCoverImage10,
        category: 'best seller',
    },
]

function HeroFeedComponent() {
    const popularBooks = data.filter((book) => book.category === 'popular')

    return (
        <div className='book-list'>
            {/* {popularBooks.map((book) => (
                <BookCardComponent key={book.id} book={book} />
            ))} */}
            {data.map((book) => (
                <BookCardComponent key={book.id} book={book} />
            ))}
            {data.map((book) => (
                <BookCardComponent key={book.id} book={book} />
            ))}
            {data.map((book) => (
                <BookCardComponent key={book.id} book={book} />
            ))}
        </div>
    )
}

export default HeroFeedComponent
