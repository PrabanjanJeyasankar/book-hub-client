import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './AdminNavBar.css'
import {
    LogOut,
    LayoutDashboard,
    BookPlus,
    LibraryBig,
    UsersRound,
    UserRoundPlus,
} from 'lucide-react'
import { UserContext } from '../../../context/UserContext/UserContext'
import LogoImage from '../../../assets/img/open_book_logo.webp'
import Button from '../../SharedComponents/ButtonComponent/ButtonComponent'
import axiosInstance from '../../../utils/axiosInstance'

function AdminNavBar() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [isExpanded, setIsExpanded] = useState(true)
    const navigate = useNavigate()

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded)
    }

    const handleLogout = () => {
        axiosInstance
            .get('/user/logout')
            .then((response) => {
                console.log(response.data.message)
                if (response.status === 200) {
                    setIsLoggedIn(false)
                    setUserProfile(null)
                    localStorage.removeItem('userProfile')
                    localStorage.removeItem('isLoggedIn')
                    navigate('/')
                }
            })
            .catch((error) => {
                console.error('Logout error:', error)
            })
    }

    return (
        <div
            className={`admin-page-container ${
                isExpanded ? 'expanded' : 'collapsed'
            }`}>
            <aside
                className={`admin-navbar-container ${
                    isExpanded ? 'expanded' : 'collapsed'
                }`}>
                <div className='admin-navbar-brand'>
                    <NavLink to='/admin/dashboard' className='admin-app-logo'>
                        <img src={LogoImage} alt='Book hub logo' />
                        {isExpanded && <div className='app-name'>Book hub</div>}
                    </NavLink>
                </div>

                <div className='admin-page-links'>
                    <NavLink
                        to='/admin/dashboard' // Updated to '/admin/dashboard'
                        className={({ isActive }) =>
                            `admin-page-link ${isActive ? 'active' : ''}`
                        }>
                        <LayoutDashboard size={18} className='icon' />
                        <p className={isExpanded ? '' : 'collapsed'}>
                            Dashboard
                        </p>
                    </NavLink>
                    <NavLink
                        to='allbooks'
                        className={({ isActive }) =>
                            `admin-page-link ${isActive ? 'active' : ''}`
                        }>
                        <LibraryBig size={18} className='icon' />
                        <p className={isExpanded ? '' : 'collapsed'}>
                            All Books
                        </p>
                    </NavLink>
                    <NavLink
                        to='addbook'
                        className={({ isActive }) =>
                            `admin-page-link ${isActive ? 'active' : ''}`
                        }>
                        <BookPlus size={18} className='icon' />
                        <p className={isExpanded ? '' : 'collapsed'}>
                            Add Books
                        </p>
                    </NavLink>
                    <NavLink
                        to='allusers'
                        className={({ isActive }) =>
                            `admin-page-link ${isActive ? 'active' : ''}`
                        }>
                        <UsersRound size={18} className='icon' />
                        <p className={isExpanded ? '' : 'collapsed'}>
                            All Users
                        </p>
                    </NavLink>
                    <NavLink
                        to='adduser'
                        className={({ isActive }) =>
                            `admin-page-link ${isActive ? 'active' : ''}`
                        }>
                        <UserRoundPlus size={18} className='icon' />
                        <p className={isExpanded ? '' : 'collapsed'}>
                            Add Users
                        </p>
                    </NavLink>
                </div>
                <div className='admin-logout'>
                    <LogOut size={18} className='icon' />
                    {isExpanded && (
                        <Button
                            onClick={handleLogout}
                            className='admin_logout_button'>
                            Log out
                        </Button>
                    )}
                </div>
            </aside>
        </div>
    )
}

export default AdminNavBar
