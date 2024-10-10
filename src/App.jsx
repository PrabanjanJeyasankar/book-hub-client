import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../src/context/UserContext/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Signup from './Authentication/Signup/Signup'
import Login from './Authentication/Login/Login'
import AddUser from './components/AdminComponents/AddUserComponent/AddUserComponent'
import AdminNavbar from './components/AdminComponents/AdminNavBar/AdminNavBar'
import AllBooks from './components/AdminComponents/AllBooksComponent/AllBooksComponent'
import AllUsersComponent from './components/AdminComponents/AllUsersComponent/AllUsersComponent'
import AddBookForm from './components/AdminComponents/AddBookFormComponent/AddBookFormComponent'
import AdminDashboard from './components/AdminComponents/AdminDashBoardComponent/AdminDashBoardComponent'
import AboutUs from './components/UserComponents/AboutUsComponent/AboutUsComponent'
import SearchPage from './components/SharedComponents/SearchPageComponent/SearchPageComponent'
import UserNavBarComponent from './components/UserComponents/UserNavBarComponent/UserNavBarComponent'
import UserProfileComponent from './components/UserComponents/UserProfilePageComponent/UserProfileComponent/UserProfileComponent'
import HeroComponent from './components/UserComponents/HeroComponent/HeroComponent'

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />

                    {/* User Protected Routes */}
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute role='user'>
                                <UserNavBarComponent />
                            </ProtectedRoute>
                        }>
                        <Route index element={<HeroComponent />} />
                        <Route path='about' element={<AboutUs />} />
                        <Route path='search' element={<SearchPage />} />
                        <Route
                            path='user-profile'
                            element={<UserProfileComponent />}
                        />
                    </Route>

                    <Route
                        path='/user-profile'
                        element={
                            <ProtectedRoute role='user'>
                                <UserProfileComponent />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Protected Routes */}
                    <Route
                        path='/admin/*'
                        element={
                            <ProtectedRoute role='admin'>
                                <AdminNavbar />
                            </ProtectedRoute>
                        }>
                        <Route path='dashboard' element={<AdminDashboard />} />
                        <Route path='allbooks' element={<AllBooks />} />
                        <Route path='addbook' element={<AddBookForm />} />
                        <Route
                            path='allusers'
                            element={<AllUsersComponent />}
                        />
                        <Route path='adduser' element={<AddUser />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default App
