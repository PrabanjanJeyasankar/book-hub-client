import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashBoardComponent.css'
import DataTable from 'react-data-table-component'
import { BookUp2, Hourglass, Users, BookImage } from 'lucide-react'
import axios from 'axios'
import OverlayABookComponent from '../OverlayABookComponent/OverlayABookComponent'

function AdminDashBoardComponent() {
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [dateTime, setDateTime] = useState(new Date())
    const [totalCopies, setTotalCopies] = useState(0)
    const [selectedBook, setSelectedBook] = useState(null)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const overlayRef = useRef(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3500/api/v1/book/'
                )
                setBooks(response.data.books)
                calculateTotalCopies(response.data.books)
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }
        fetchBooks()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3500/api/v1/users/'
                )
                setUsers(response.data.users)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        const timerId = setInterval(() => {
            setDateTime(new Date())
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

    const calculateTotalCopies = (books) => {
        const total = books.reduce((acc, book) => acc + book.availableCopies, 0)
        setTotalCopies(total)
    }

    const formatDateTime = (date) => {
        const optionsDate = { month: 'short', day: '2-digit', year: 'numeric' }
        const optionsTime = {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }

        const formattedDate = date.toLocaleDateString('en-US', optionsDate)
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime)

        return `${formattedDate} | ${formattedTime}`
    }

    const customTableStyle = {
        headCells: {
            style: {
                fontSize: '14px',
            },
        },
    }

    const handleRowClick = (row) => {
        setSelectedBook(row)
        setIsOverlayVisible(true)
    }

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            handleCloseOverlay()
        }
    }

    useEffect(() => {
        if (isOverlayVisible) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOverlayVisible])

    const handleCloseOverlay = () => {
        setIsOverlayVisible(false)
        setSelectedBook(null)
    }

    const booksColumns = [
        {
            name: 'Book id',
            selector: (row) => row.isbn,
        },
        {
            name: 'Title',
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: 'Author',
            selector: (row) => row.author,
        },
        {
            name: 'Copies Available',
            selector: (row) => row.availableCopies,
            sortable: true,
        },
    ]

    const userColumns = [
        {
            name: 'User ID',
            selector: (row) => row.id,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Book Issued',
            selector: (row) => row.bookIssued,
        },
    ]

    return (
        <div className='admin-dash-board-container'>
            <div className='admin-info'>
                <h2>Hello, Admin!</h2>
                <div className='clock'>{formatDateTime(dateTime)}</div>
            </div>
            <div className='statistics'>
                <div className='statistics-box' id='total-books'>
                    <div className='stats-child'>
                        <span>{totalCopies}</span>
                        <p>Total Books</p>
                    </div>
                    <div className='stats-icon'>
                        <BookImage size={32} />
                    </div>
                </div>
                <div className='statistics-box' id='borrowed-books'>
                    <div className='stats-child'>
                        <span>180</span>
                        <p>Borrowed Books</p>
                    </div>
                    <div className='stats-icon'>
                        <BookUp2 size={32} />
                    </div>
                </div>
                <div className='statistics-box' id='overdue-books'>
                    <div className='stats-child'>
                        <span>16</span>
                        <p>Overdue Books</p>
                    </div>
                    <div className='stats-icon'>
                        <Hourglass size={32} />
                    </div>
                </div>
                <div className='statistics-box' id='total-members'>
                    <div className='stats-child'>
                        <span>356</span>
                        <p>Total Members</p>
                    </div>
                    <div className='stats-icon'>
                        <Users size={32} />
                    </div>
                </div>
            </div>
            <div className='books-and-members'>
                <div className='book-list-container'>
                    <div className='book-list-header'>
                        <h3>Books List</h3>
                        <Link to='/addbook' className='add-book-btn'>Add book</Link>
                    </div>
                    <div className='books-table'>
                        <DataTable
                            columns={booksColumns}
                            data={books}
                            fixedHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            customStyles={customTableStyle}
                            onRowClicked={handleRowClick}
                        />
                    </div>
                </div>
                {/* <div className='users-list-container'>
                    <div className='users-list-header'>
                        <h3>Users List</h3>
                        <button>Add user</button>
                    </div>
                    <div className='user-table'>
                        <DataTable
                            columns={userColumns}
                            data={users}
                            fixedHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            customStyles={customTableStyle}
                        />
                    </div>
                </div> */}
            </div>
            <div className='new-arrival-books'></div>

            {isOverlayVisible && selectedBook && (
                <OverlayABookComponent
                    bookData={selectedBook}
                    onClose={handleCloseOverlay}
                    ref={overlayRef}
                />
            )}
        </div>
    )
}

export default AdminDashBoardComponent
