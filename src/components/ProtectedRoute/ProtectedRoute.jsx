import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext';

const ProtectedRoute = ({ element, allowedRoles, redirectTo }) => {
    const { userProfile, isLoggedIn } = useUserContext();

    // If the user is not logged in (logged out), treat them as a "guest".
    // If the user is logged in, use their role (either 'admin' or 'user').
    const userRole = userProfile?.role || 'guest';

    // Check if the current user's role is allowed to access the route.
    const isAuthorized = allowedRoles.includes(userRole);

    // If the user is logged out and "guest" access is allowed, let them access the component.
    if (!isLoggedIn && allowedRoles.includes('guest')) {
        return element;
    }

    // If the user is an admin, but they are trying to access a user route, redirect them back to the admin dashboard.
    if (userRole === 'admin' && !allowedRoles.includes('admin')) {
        return <Navigate to='/admin/dashboard' replace />;
    }

    // If the user is a regular user trying to access an admin route, redirect them back to the home page.
    if (userRole === 'user' && allowedRoles.includes('admin')) {
        return <Navigate to='/' replace />;
    }

    // If the user is not authorized for the route, redirect them to the login page (or a specified fallback).
    if (!isAuthorized) {
        return <Navigate to={redirectTo || '/login'} replace />;
    }

    // If the user is authorized, render the requested component.
    return isAuthorized ? element : <Navigate to={redirectTo || '/login'} replace />;
};

export default ProtectedRoute;
