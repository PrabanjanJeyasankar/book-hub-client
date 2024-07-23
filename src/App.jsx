import React from 'react'
import NavBarComponent from './components/NavBarComponent/NavBarComponent'
import { BrowserRouter } from 'react-router-dom'
import AdminDashBoardComponent from './components/AdminDashBoardComponent/AdminDashBoardComponent'
import AddBookFormComponent from './components/AddBookFormComponent/AddBookFormComponent'


function App() {
    return (
        <>
        {/* <AddBookFormComponent/> */}
        {/* <AdminDashBoardComponent/> */}
            <BrowserRouter>
                <NavBarComponent />
            </BrowserRouter>
        </>
    )
}

export default App

