import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const AddUser = lazy(() =>
    import('../components/AdminComponents/AddUserComponent/AddUserComponent')
)
const SearchPage = lazy(() =>
    import(
        '../components/SharedComponents/SearchPageComponent/SearchPageComponent'
    )
)
const AboutUs = lazy(() =>
    import('../components/UserComponents/AboutUsComponent/AboutUsComponent')
)
const AddBookFormComponent = lazy(() =>
    import(
        '../components/AdminComponents/AddBookFormComponent/AddBookFormComponent'
    )
)
const AllBooks = lazy(() =>
    import('../components/AdminComponents/AllBooksComponent/AllBooksComponent')
)
const AllUsersComponent = lazy(() =>
    import('../components/AdminComponents/AllUsersComponent/AllUsersComponent')
)
const UserProfileComponent = lazy(() =>
    import(
        '../components/UserComponents/UserProfilePageComponent/UserProfileComponent/UserProfileComponent'
    )
)
import Signup from '../Authentication/Signup/Signup'
import Login from '../Authentication/Login/Login'
import AdminDashboard from '../components/AdminComponents/AdminDashBoardComponent/AdminDashBoardComponent'
import HeroComponent from '../components/UserComponents/HeroComponent/HeroComponent'
import NotFoundPage from '../components/SharedComponents/NotFoundPage/NotFoundPage'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import useUserContext from '../hooks/useUserContext'

const AppRoutes = () => {
    const { isLoggedIn, userProfile } = useUserContext()

    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* User routes accessible by users and guests */}
                    <Route element={<UserLayout />}>
                        <Route
                            path='/'
                            element={
                                <ProtectedRoute
                                    element={<HeroComponent />}
                                    allowedRoles={['user', 'guest']} // Users and guests can access
                                />
                            }
                        />
                        <Route
                            path='/search'
                            element={
                                <ProtectedRoute
                                    element={<SearchPage />}
                                    allowedRoles={['user', 'guest']} // Users and guests can search
                                />
                            }
                        />
                        <Route
                            path='/user-profile'
                            element={
                                <ProtectedRoute
                                    element={<UserProfileComponent />}
                                    allowedRoles={['user']} // Only users can access profile
                                    redirectTo='/login' // Redirect unauthorized access
                                />
                            }
                        />
                        <Route path='/about' element={<AboutUs />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                    </Route>

                    {/* Admin routes under AdminLayout */}
                    <Route path='/admin' element={<AdminLayout />}>
                        <Route
                            index
                            element={<Navigate to='/admin/dashboard' replace />}
                        />
                        <Route
                            path='dashboard'
                            element={
                                <ProtectedRoute
                                    element={<AdminDashboard />}
                                    allowedRoles={['admin']} // Only admins can access dashboard
                                />
                            }
                        />
                        <Route
                            path='allbooks'
                            element={
                                <ProtectedRoute
                                    element={<AllBooks />}
                                    allowedRoles={['admin']} // Only admins can access
                                />
                            }
                        />
                        <Route
                            path='addbook'
                            element={
                                <ProtectedRoute
                                    element={<AddBookFormComponent />}
                                    allowedRoles={['admin']} // Only admins
                                />
                            }
                        />
                        <Route
                            path='allusers'
                            element={
                                <ProtectedRoute
                                    element={<AllUsersComponent />}
                                    allowedRoles={['admin']} // Only admins
                                />
                            }
                        />
                        <Route
                            path='adduser'
                            element={
                                <ProtectedRoute
                                    element={<AddUser />}
                                    allowedRoles={['admin']} // Only admins
                                />
                            }
                        />
                    </Route>

                    {/* Fallback for undefined routes */}
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}

export default AppRoutes
