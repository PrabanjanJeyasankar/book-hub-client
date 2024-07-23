import React from 'react'
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom'
import './AdminNavBar.css'
import AdminDashBoardComponent from '../../components/AdminDashBoardComponent/AdminDashBoardComponent'
import AddBookFormComponent from '../../components/AddBookFormComponent/AddBookFormComponent'
import LogoImage from '../../assets/img/open_book_logo.png'
import {
    LogOut,
    LayoutDashboard,
    BookPlus ,
    LibraryBig ,
    UsersRound ,
    UserRoundPlus 
} from 'lucide-react'

function AdminPage() {
    return (
        <div className='admin-page-container'>
            <BrowserRouter>
                <div className='admin-page-content'>
                    <div className='navbar-container'>
                        <div className='navbar-brand'>
                            <Link to='/' className='app-logo'>
                                <img src={LogoImage} alt='Book hub logo' />
                                <span className='app-name'>Book hub</span>
                            </Link>
                        </div>
                        <div className='page-links'>
                            <Link to='/'>
                                <LayoutDashboard size={18} />
                                <p>DashBoard</p>
                            </Link>
                            <Link to='/addbook'>
                                <LibraryBig  size={18} />
                                <p>All Books</p>
                            </Link>
                            <Link to='/addbook'>
                                <BookPlus  size={18} />
                                <p>Add Books</p>
                            </Link>
                            <Link to='/addbook'>
                                 <UsersRound size={18}/>
                                <p>All Users</p>
                            </Link>
                            <Link to='/addbook'>
                                 <UserRoundPlus  size={18}/>
                                <p>Add Users</p>
                            </Link>
                        </div>
                        {/* <div className='signup-login-links'>
                            <div className='logout-btn'>
                                <LogOut size={14} /> <p>Logout</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<AdminDashBoardComponent />} />
                    <Route path='/addbook' element={<AddBookFormComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AdminPage
