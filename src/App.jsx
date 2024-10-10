import React from 'react'
import Home from './pages/Home/Home'
import AdminNavBar from './pages/AdminNavBar/AdminNavBar'
import { UserProvider } from './context/UserContext/UserContext'

function App() {
    return (
        <>
            <UserProvider>
                <AdminNavBar />
            </UserProvider>

            {/* <Home/> */}
        </>
    )
}

export default App
