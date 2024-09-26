import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './UserNavBarComponent.css'
import logoImage from '../../assets/img/open_book_logo.png'
import Signup from '../../pages/Signup/Signup'
import Login from '../../pages/Login/Login'
import HeroComponent from '../HeroComponent/HeroComponent'
import AboutUsComponent from '../AboutUsComponent/AboutUsComponent'
import SearchPageComponent from '../SearchPageComponent/SearchPageComponent'

function UserNavBarComponent() {
    return (
        <nav className='navbar' id='navbar'>
            <div className='user-navbar-container'>
                <div className='user-navbar-brand'>
                    <Link to='/' className='app-logo'>
                        <img src={logoImage} alt='Book hub logo' />
                        <span className='app-name'>Book hub</span>
                    </Link>
                </div>
                <div className='user-navbar-center'>
                    <div className='page-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                    </div>
                </div>
                <div className='signup-login-links'>
                    <Link className='login-btn' to='/login'>
                        Login
                    </Link>
                    <Link className='signup-btn' to='/signup'>
                        Sign up
                    </Link>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<HeroComponent />} />
                <Route path='/about' element={<AboutUsComponent />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/search' element={<SearchPageComponent/>} />
            </Routes>
        </nav>
    )
}

export default UserNavBarComponent
