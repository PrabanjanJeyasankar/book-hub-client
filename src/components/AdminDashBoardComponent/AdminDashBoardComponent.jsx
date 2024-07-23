import React, { useEffect, useState } from 'react'
import './AdminDashBoardComponent.css'
import DataTable from 'react-data-table-component'
import { BookUp2, Hourglass, Users, BookImage } from 'lucide-react'

function AdminDashBoardComponent() {
    const sampleBooks = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            availableCopies: 35,
        },
        {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            availableCopies: 55,
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            availableCopies: 64,
        },
    ]

    const sampleUsers = [
        {
            id: 1,
            name: 'John Doe',
            bookIssued: '6',
        },
        {
            id: 2,
            name: 'Jane Smith',
            bookIssued: '2',
        },
        {
            id: 3,
            name: 'Bob Johnson',
            bookIssued: '5',
        },
    ]

    const booksColumns = [
        {
            name: 'Book id',
            selector: (row) => row.id,
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
    const handleRowClick = (row) => {
        alert(`You clicked on: ${row.title}`)
        // You can add more functionality here, such as navigating to a detailed view or opening a modal
    }

    const [dateTime, setDateTime] = useState(new Date())

    useEffect(() => {
        const timerId = setInterval(() => {
            setDateTime(new Date())
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

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

    return (
        <div className='admin-dash-board-container'>
            <div className='admin-info'>
                <h2>Hello, Admin!</h2>
                <div className='clock'>{formatDateTime(dateTime)}</div>
            </div>
            <div className='statistics'>
                <div className='statistics-box' id='total-books'>
                    <div className='stats-child'>
                        <span>1223</span>
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
                        <button>Add book</button>
                    </div>
                    <div className='books-table'>
                        <DataTable
                            columns={booksColumns}
                            data={sampleBooks}
                            fixedHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            customStyles={customTableStyle}
                            onRowClicked={handleRowClick}
                        />
                    </div>
                </div>
                <div className='users-list-container'>
                    <div className='users-list-header'>
                        <h3>Users List</h3>
                        <button>Add user</button>
                    </div>
                    <div className='user-table'>
                        <DataTable
                            columns={userColumns}
                            data={sampleUsers}
                            fixedHeader
                            pagination
                            highlightOnHover
                            pointerOnHover
                            customStyles={customTableStyle}
                        />
                    </div>
                </div>
            </div>
            <div className='new-arrival-books'></div>
        </div>
    )
}

export default AdminDashBoardComponent
