import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './UserNavBarComponent.css'
import logoImage from '../../assets/img/open_book_logo.png'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import HeroComponent from '../../components/HeroComponent/HeroComponent'
import AboutUsComponent from '../../components/AboutUsComponent/AboutUsComponent'
import SearchPageComponent from '../../components/SearchPageComponent/SearchPageComponent'
import axios from 'axios'

function UserNavBarComponent() {
    useEffect(() => {
        axios
            .get('http://localhost:3500/api/v1/user/authenticate', {
                withCredentials: true,
            })
            .then((response) => console.log(response))
    })

    return (
        <nav className='user-navbar'>
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
                        <Link to='/search'>Find Books</Link>
                        <Link to='/about'>About us</Link>
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
                <Route path='/search' element={<SearchPageComponent />} />
            </Routes>
        </nav>
    )
}

export default UserNavBarComponent
