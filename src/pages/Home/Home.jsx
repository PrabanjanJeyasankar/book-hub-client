import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNavBarComponent from '../../pages/UserNavBarComponent/UserNavBarComponent'
import AdminNavBar from '../AdminNavBar/AdminNavBar'

function Home() {
    return (
        <>
        <BrowserRouter>
        {/* <NavBarComponent/> */}
            {/* <HeroComponent/> */}
            {/* <AdminNavBar /> */}
                <UserNavBarComponent/>
            </BrowserRouter>
        </>
    )
}

export default Home
