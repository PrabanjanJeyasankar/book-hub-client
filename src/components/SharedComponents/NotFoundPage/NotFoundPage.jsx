import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext/UserContext'
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'
import './NotFoundPage.css'

function NotFoundPage() {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(30)
    const { userProfile } = useContext(UserContext)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1)
        }, 1000)

        if (countdown === 0) {
            if (userProfile?.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/')
            }
        }

        return () => clearInterval(timer)
    }, [countdown, navigate, userProfile?.role])

    return (
        <ErrorBoundary>
            <div className='not_found_container'>
                <h1 className='not_found_title'>404</h1>
                <p className='not_found_message'>
                    Pccchhhhh! The page you are looking for does not exist.
                </p>
                <p className='not_found_redirect'>
                    Redirecting you
                    {userProfile?.role === 'admin'
                        ? ' to the admin dashboard '
                        : ' to the homepage '}
                    in {countdown} seconds...
                </p>
                <a
                    href={
                        userProfile?.role === 'admin' ? '/admin/dashboard' : '/'
                    }
                    className='not_found_link'>
                    Go now
                </a>
            </div>
        </ErrorBoundary>
    )
}

export default NotFoundPage
