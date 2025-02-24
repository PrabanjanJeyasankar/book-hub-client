import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBooksComponent from '../components/AdminComponents/AllBooksComponent/AllBooksComponent'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import GoogleAccountVerification from '../components/SharedComponents/GoogleAccountVerification/GoogleAccountVerification'
import PageLoadingAnimation from '../components/SharedComponents/PageLoadingAnimation/PageLoadingAnimation'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import GoogleAuthLayout from '../layouts/googleAuthLayout'
import UserLayout from '../layouts/UserLayout'

// Lazy load components
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
const Signup = lazy(() =>
    import('../authentication/SignupComponent/SignupComponent')
)
const Login = lazy(() =>
    import('../authentication/LoginComponent/LoginComponent')
)
const AdminDashboard = lazy(() =>
    import(
        '../components/AdminComponents/AdminDashBoardComponent/AdminDashBoardComponent'
    )
)
const HeroComponent = lazy(() =>
    import('../components/UserComponents/HeroComponent/HeroComponent')
)
const NotFoundPage = lazy(() =>
    import('../components/SharedComponents/NotFoundPage/NotFoundPage')
)
const RequestOtpComponent = lazy(() =>
    import('../authentication/RequestOtpComponent/RequestOtpComponent')
)
const OTPVerificationComponent = lazy(() =>
    import('../authentication/VerifyOtpComponent/VerifyOtpComponent')
)
const SetupNewPasswordComponent = lazy(() =>
    import('../authentication/SetNewPasswordComponent/SetNewPasswordComponent')
)

const AppRoutes = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<PageLoadingAnimation />}>
                <Routes>
                    {/* User and Authentication routes with UserLayout */}
                    <Route element={<UserLayout />}>
                        <Route
                            path='/'
                            element={
                                <ProtectedRoute
                                    element={<HeroComponent />}
                                    allowedRoles={['user', 'guest']} // Accessible to users and guests
                                />
                            }
                        />
                        <Route
                            path='/search'
                            element={
                                <ProtectedRoute
                                    element={<SearchPage />}
                                    allowedRoles={['user', 'guest']} // Accessible to users and guests
                                />
                            }
                        />
                        <Route
                            path='/user-profile'
                            element={
                                <ProtectedRoute
                                    element={<UserProfileComponent />}
                                    allowedRoles={['user']} // Accessible only to users
                                    redirectTo='/login'
                                />
                            }
                        />
                        <Route path='/about' element={<AboutUs />} />

                        {/* Authentication routes */}
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/request-otp'
                            element={<RequestOtpComponent />}
                        />
                        <Route
                            path='/verify-otp'
                            element={<OTPVerificationComponent />}
                        />
                        <Route
                            path='/set-new-password'
                            element={<SetupNewPasswordComponent />}
                        />
                    </Route>

                    {/* Admin routes with AdminLayout */}
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
                                    allowedRoles={['admin']} // Only admins can access
                                />
                            }
                        />
                        <Route
                            path='allbooks'
                            element={
                                <ProtectedRoute
                                    element={<AllBooksComponent />}
                                    allowedRoles={['admin']} // Only admins
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

                    {/* Google authentication routes */}
                    <Route element={<GoogleAuthLayout />}>
                        <Route
                            path='/google-account-verification'
                            element={<GoogleAccountVerification />}
                        />
                    </Route>

                    {/* Fallback for undefined routes */}
                    {/* <Route path='*' element={<NotFoundPage />} /> */}
                </Routes>
            </Suspense>
        </ErrorBoundary>
    )
}

export default AppRoutes
