import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext/UserContext'

function ProtectedRoute({ children, role }) {
    const { isLoggedIn, userProfile } = useUserContext()

    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    // Handle role-based redirection
    if (role === 'admin' && userProfile?.role !== 'admin') {
        return <Navigate to='/' />
    }

    if (role === 'user' && userProfile?.role !== 'user') {
        // If an admin tries to access user routes, redirect them to the admin dashboard
        if (userProfile?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        }
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute
