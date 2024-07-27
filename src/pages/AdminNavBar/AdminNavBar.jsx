import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './AdminNavBar.css'
import AdminDashBoardComponent from '../../components/AdminDashBoardComponent/AdminDashBoardComponent'
import AddBookFormComponent from '../../components/AddBookFormComponent/AddBookFormComponent'
import LogoImage from '../../assets/img/open_book_logo.png'
import {
    LogOut,
    LayoutDashboard,
    BookPlus,
    LibraryBig,
    UsersRound,
    UserRoundPlus,
} from 'lucide-react'
import AllBooksComponent from '../../components/AllBooksComponent/AllBooksComponent'

function AdminPage() {
    return (
        <div className='admin-page-container'>
            <BrowserRouter>
                <div className='navbar-container'>
                    <div className='navbar-brand'>
                        <Link to='/' className='app-logo'>
                            <img src={LogoImage} alt='Book hub logo' />
                            <div className='app-name'>Book hub</div>
                        </Link>
                    </div>
                    <div className='page-links'>
                        <Link to='/'>
                        <div className="page-link">
                            <LayoutDashboard size={18} />
                            <p>DashBoard</p></div>
                        </Link>
                        <Link to='/allbooks'>
                        <div className="page-link"><LibraryBig size={18} />
                            <p>All Books</p></div>
                        </Link>
                        <Link to='/addbook'>
                        <div className="page-link"> <BookPlus size={18} />
                            <p>Add Books</p></div>
                        </Link>
                        <Link to='/allusers'>
                        <div className="page-link"> <UsersRound size={18} />
                            <p>All Users</p></div>
                        </Link>
                        <Link to='/adduser'>
                        <div className="page-link"> <UserRoundPlus size={18} />
                            <p>Add Users</p></div>
                        </Link>
                    </div>
                    <div className='admin-user-profile'>
                        <img className='user-profile-icon' src='' alt='' />
                        <div className='user-name'>user name</div>
                        <div className='more-actions'></div>
                    </div>
                </div>
                <div className='main-content'>
                    <Routes>
                        <Route path='/' element={<AdminDashBoardComponent />} />
                        <Route
                            path='/allbooks'
                            element={<AllBooksComponent />}
                        />
                        <Route
                            path='/addbook'
                            element={<AddBookFormComponent />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default AdminPage
