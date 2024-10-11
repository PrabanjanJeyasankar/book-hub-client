import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext/UserContext'

function ProtectedRoute({ children, role }) {
    const { isLoggedIn, userProfile } = useUserContext()

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    if (role && userProfile?.role !== role) {
        // Redirect users trying to access admin routes
        if (role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        }

        // Redirect admin trying to access user routes
        if (role === 'user' && userProfile?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        }

        // Redirect regular users to homepage if they try accessing admin routes
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute
