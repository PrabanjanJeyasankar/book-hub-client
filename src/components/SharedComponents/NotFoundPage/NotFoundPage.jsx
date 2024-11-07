import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext/UserContext'
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'
import './NotFoundPage.css'

function NotFoundPage() {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(150)
    const { userProfile } = useContext(UserContext)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 1) {
                    return prevCountdown - 1
                } else {
                    return 0
                }
            })
        }, 1000)

        const checkCountdown = setInterval(() => {
            if (countdown === 0) {
                clearInterval(timer)
                clearInterval(checkCountdown)
                if (userProfile?.role === 'admin') {
                    window.location.href = '/admin/dashboard'
                } else {
                    window.location.href = '/'
                }
            }
        }, 100)

        return () => {
            clearInterval(timer)
            clearInterval(checkCountdown)
        }
    }, [navigate, countdown, userProfile?.role])

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
