import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
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
import AddUserComponent from '../../components/AddUserComponent/AddUserComponent'
import SearchPageComponent from '../../components/SearchPageComponent/SearchPageComponent'

function AdminNavBar() {
    const [isExpanded, setIsExpanded] = useState(true)

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div
            className={`admin-page-container ${
                isExpanded ? 'expanded' : 'collapsed'
            }`}>
            <BrowserRouter>
                <aside
                    className={`admin-navbar-container ${
                        isExpanded ? 'expanded' : 'collapsed'
                    }`}>
                    <div className='admin-navbar-brand'>
                        <NavLink to='/' className='admin-app-logo'>
                            <img src={LogoImage} alt='Book hub logo' />
                            {isExpanded && (
                                <div className='app-name'>Book hub</div>
                            )}
                        </NavLink>
                    </div>

                    <div className='admin-page-links'>
                        <div className='link-outer'>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    `admin-page-link ${
                                        isActive ? 'active' : ''
                                    }`
                                }>
                                <LayoutDashboard size={18} className='icon' />
                                <p className={isExpanded ? '' : 'collapsed'}>
                                    Dashboard
                                </p>
                            </NavLink>
                        </div>

                        <NavLink
                            to='/allbooks'
                            className={({ isActive }) =>
                                `admin-page-link ${isActive ? 'active' : ''}`
                            }>
                            <LibraryBig size={18} className='icon' />
                            <p className={isExpanded ? '' : 'collapsed'}>
                                All Books
                            </p>
                        </NavLink>
                        <NavLink
                            to='/addbook'
                            className={({ isActive }) =>
                                `admin-page-link ${isActive ? 'active' : ''}`
                            }>
                            <BookPlus size={18} className='icon' />
                            <p className={isExpanded ? '' : 'collapsed'}>
                                Add Books
                            </p>
                        </NavLink>
                        <NavLink
                            to='/allusers'
                            className={({ isActive }) =>
                                `admin-page-link ${isActive ? 'active' : ''}`
                            }>
                            <UsersRound size={18} className='icon' />
                            <p className={isExpanded ? '' : 'collapsed'}>
                                All Users
                            </p>
                        </NavLink>
                        <NavLink
                            to='/adduser'
                            className={({ isActive }) =>
                                `admin-page-link ${isActive ? 'active' : ''}`
                            }>
                            <UserRoundPlus size={18} className='icon' />
                            <p className={isExpanded ? '' : 'collapsed'}>
                                Add Users
                            </p>
                        </NavLink>
                    </div>
                    <div className='admin-logout-button'>
                        <LogOut size={18} className='icon' />
                        {isExpanded && <span>Logout</span>}
                    </div>
                </aside>
                <div className='main-content'>
                    <Routes>
                        <Route path='/' element={<AdminDashBoardComponent />} />
                        <Route
                            path='/allbooks'
                            element={<SearchPageComponent/>}
                        />
                        <Route
                            path='/addbook'
                            element={<AddBookFormComponent />}
                        />
                        <Route
                            path='/allusers'
                            element={<AddBookFormComponent />}
                        />
                        <Route
                            path='/adduser'
                            element={<AddUserComponent />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default AdminNavBar
