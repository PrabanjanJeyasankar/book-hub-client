import React from 'react'
import NavBarComponent from './components/NavBarComponent/NavBarComponent'
import { BrowserRouter } from 'react-router-dom'
import AdminDashBoardComponent from './components/AdminDashBoardComponent/AdminDashBoardComponent'
import AddBookFormComponent from './components/AddBookFormComponent/AddBookFormComponent'
import AdminNavBar from '../src/pages/AdminNavBar/AdminNavBar'

function App() {
    return (
        <>
        {/* <AddBookFormComponent/> */}
        {/* <AdminDashBoardComponent/> */}
            {/* <BrowserRouter> */}
                {/* <NavBarComponent /> */}
                {/* <AdminDashBoardComponent/> */}
                <AdminNavBar/>
            {/* </BrowserRouter> */}
        </>
    )
}

export default App

