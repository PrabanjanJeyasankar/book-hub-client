import React from 'react'
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom'
import './AdminPage.css'
import AdminDashBoardComponent from '../../components/AdminDashBoardComponent/AdminDashBoardComponent'
import AddBookFormComponent from '../../components/AddBookFormComponent/AddBookFormComponent'
import LogoImage from '../../assets/img/open_book_logo.png'
function AdminPage() {
    return (
        <>
            <BrowserRouter>
                <div className='admin-page-container'>
                    <div className='navbar-container'>
                        <div className='navbar-brand'>
                            <Link to='/' className='app-logo'>
                                <img src={LogoImage} alt='Book hub logo' />
                                <span className='app-name'>Book hub</span>
                            </Link>
                        </div>
                        <div className='page-links'>
                            <Link to='/'>DashBoard</Link>
                            <Link to='/addbook'>Add Book</Link>
                        </div>
                        <div className='signup-login-links'>
                            <div className='logout-btn'>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<AdminDashBoardComponent />} />
                    <Route path='/addbook' element={<AddBookFormComponent/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AdminPage
