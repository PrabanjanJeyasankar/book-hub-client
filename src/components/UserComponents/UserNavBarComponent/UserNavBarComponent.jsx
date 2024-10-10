import React, { useState, useEffect, useRef, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext/UserContext'
import { CircleUserRound, LogOut } from 'lucide-react'
import './UserNavBarComponent.css'
import axios from 'axios'

import Signup from '../../../Authentication/Signup/Signup'
import Login from '../../../Authentication/Login/Login'
import HeroComponent from '../HeroComponent/HeroComponent'
import AboutUsComponent from '../AboutUsComponent/AboutUsComponent'
import SearchPageComponent from '../../SharedComponents/SearchPageComponent/SearchPageComponent'
import UserProfileComponent from '../UserProfilePageComponent/UserProfileComponent/UserProfileComponent'

import logoImage from '../../../assets/img/open_book_logo.png'
import DummyProfileImage from '../../../assets/img/img1.png'

function UserNavBarComponent() {
    const { isLoggedIn, userProfile, setIsLoggedIn, setUserProfile } =
        useContext(UserContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                isDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [isDropdownOpen])

    const handleLogout = () => {
        axios
            .get('http://localhost:3500/api/v1/user/logout', {
                withCredentials: true,
            })
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

    const handleDropDownUserProfileClick = () => {
        setIsDropdownOpen(false)
    }

    const handleProfileClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    return (
        <nav className='user-navbar'>
            <div className='user-navbar-container'>
                <div className='user-navbar-brand'>
                    <Link to='/' className='user-page-app-logo'>
                        <img src={logoImage} alt='Book hub logo' />
                        <span className='app-name'>Book hub</span>
                    </Link>
                </div>
                <div className='user-navbar-center'>
                    <div className='page-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/search'>Search Books</Link>
                        <Link to='/about'>About us</Link>
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className='signup-login-links'>
                        <div className='user-profile-btn' ref={dropdownRef}>
                            <img
                                src={DummyProfileImage}
                                alt='Profile'
                                className='user-nav-profile-icon'
                                onClick={handleProfileClick}
                            />
                            {isDropdownOpen && (
                                <div className='user-profile-dropdown-menu open'>
                                    <div className='user-profile-dropdown-header'>
                                        <img
                                            src={DummyProfileImage}
                                            alt='Profile'
                                            className='user-profile-dropdown-image'
                                        />
                                        <Link
                                            to='/user-profile'
                                            className='user-profile-dropdown-name'>
                                            {userProfile.name}
                                        </Link>
                                    </div>
                                    <ul className='user-profile-dropdown-list'>
                                        <li
                                            onClick={
                                                handleDropDownUserProfileClick
                                            }>
                                            <Link to='/user-profile'>
                                                <CircleUserRound
                                                    strokeWidth={2}
                                                    size={18}
                                                />
                                                <p>Profile</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <a onClick={handleLogout}>
                                                <LogOut
                                                    strokeWidth={2}
                                                    size={18}
                                                />
                                                <p>Log out</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='signup-login-links'>
                        <Link className='login-btn' to='/login'>
                            Login
                        </Link>
                        <Link className='signup-btn' to='/signup'>
                            Sign up
                        </Link>
                    </div>
                )}
            </div>

            <Routes>
                <Route path='/' element={<HeroComponent />} />
                <Route path='/about' element={<AboutUsComponent />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/search' element={<SearchPageComponent />} />
                <Route
                    path='/user-profile'
                    element={<UserProfileComponent />}
                />
            </Routes>
        </nav>
    )
}

export default UserNavBarComponent
