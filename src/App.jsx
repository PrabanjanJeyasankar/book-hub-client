import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../src/context/UserContext/UserContext'
import { FormDataProvider } from './context/FormContext/FormContext'
import { BooksProvider } from './context/BooksContext/BooksContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const AddUser = lazy(() =>
    import('./components/AdminComponents/AddUserComponent/AddUserComponent')
)
const SearchPage = lazy(() =>
    import(
        './components/SharedComponents/SearchPageComponent/SearchPageComponent'
    )
)
const AboutUs = lazy(() =>
    import('./components/UserComponents/AboutUsComponent/AboutUsComponent')
)
const AddBookFormComponent = lazy(() =>
    import(
        './components/AdminComponents/AddBookFormComponent/AddBookFormComponent'
    )
)
const AllBooks = lazy(() =>
    import('./components/AdminComponents/AllBooksComponent/AllBooksComponent')
)
const AllUsersComponent = lazy(() =>
    import('./components/AdminComponents/AllUsersComponent/AllUsersComponent')
)
const UserProfileComponent = lazy(() =>
    import(
        './components/UserComponents/UserProfilePageComponent/UserProfileComponent/UserProfileComponent'
    )
)
import Signup from './Authentication/Signup/Signup'
import Login from './Authentication/Login/Login'
import AdminNavbar from './components/AdminComponents/AdminNavBar/AdminNavBar'
import AdminDashboard from './components/AdminComponents/AdminDashBoardComponent/AdminDashBoardComponent'
import UserNavBarComponent from './components/UserComponents/UserNavBarComponent/UserNavBarComponent'
import HeroComponent from './components/UserComponents/HeroComponent/HeroComponent'
import NotFoundPage from './components/SharedComponents/NotFoundPage/NotFoundPage'

function App() {
    return (
        <UserProvider>
            <BooksProvider>
                <FormDataProvider>
                    <Router>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route
                                        path='/signup'
                                        element={<Signup />}
                                    />
                                    <Route path='/login' element={<Login />} />

                                    {/* User Protected Routes */}
                                    <Route
                                        path='/'
                                        element={
                                            <ProtectedRoute role='user'>
                                                <UserNavBarComponent />
                                            </ProtectedRoute>
                                        }>
                                        <Route
                                            index
                                            element={<HeroComponent />}
                                        />
                                        <Route
                                            path='about'
                                            element={<AboutUs />}
                                        />
                                        <Route
                                            path='search'
                                            element={<SearchPage />}
                                        />
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
                                        <Route
                                            path='dashboard'
                                            element={<AdminDashboard />}
                                        />
                                        <Route
                                            path='allbooks'
                                            element={<AllBooks />}
                                        />
                                        <Route
                                            path='addbook'
                                            element={<AddBookFormComponent />}
                                        />
                                        <Route
                                            path='allusers'
                                            element={<AllUsersComponent />}
                                        />
                                        <Route
                                            path='adduser'
                                            element={<AddUser />}
                                        />
                                    </Route>
                                    <Route
                                        path='*'
                                        element={<NotFoundPage/>}
                                    />
                                </Routes>
                            </Suspense>
                        </ErrorBoundary>
                    </Router>
                </FormDataProvider>
            </BooksProvider>
        </UserProvider>
    )
}

export default App
