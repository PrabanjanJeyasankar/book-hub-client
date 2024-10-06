import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNavBarComponent from '../../pages/UserNavBarComponent/UserNavBarComponent'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import { UserProvider } from '../../context/UserContext/UserContext'

function Home() {
    return (
        <>

            <BrowserRouter>
                <UserProvider>
                    <UserNavBarComponent />
                </UserProvider>
            </BrowserRouter>
        </> 
    )
}

export default Home
