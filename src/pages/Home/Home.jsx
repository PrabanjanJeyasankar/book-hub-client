import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import HeroFeedComponent from '../../components/HeroFeedComponent/HeroFeedComponent'
import HeroComponent from '../../components/HeroComponent/HeroComponent'
import UserNavBarComponent from '../../components/UserNavBarComponent/UserNavBarComponent'

function Home() {
    return (
        <>
        <BrowserRouter>
        {/* <NavBarComponent/> */}
            {/* <HeroComponent/> */}
                <UserNavBarComponent/>
            </BrowserRouter>
        </>
    )
}

export default Home
