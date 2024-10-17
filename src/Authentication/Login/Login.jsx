import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import './Login.css'
import Button from '../../components/SharedComponents/ButtonComponent/ButtonComponent'
import handleLoginService from '../../services/handleLoginService'
import toast from 'react-hot-toast'

function Login() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!email) newErrors.email = '* Email is required'
        if (!password) newErrors.password = '* Password is required'

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                const data = await handleLoginService(email, password)
                const userProfile = data.userProfile
                setIsLoggedIn(true)
                setUserProfile(userProfile)
                localStorage.setItem('userProfile', JSON.stringify(userProfile))
                localStorage.setItem('isLoggedIn', 'true')

                // Role-based redirection
                if (userProfile.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            } catch (error) {
                if (error.response.status == 404) {
                    toast.error('User not found, please sign up.')
                } else if (error.response.status == 401) {
                    toast.error('Incorrect Password.')
                }

                console.error('Error during login:', error)
            }
        }
    }

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2 className='login-title'>Log In</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='input-container-login '>
                        <div className='email-input'>
                            <input
                                id='email'
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='email-error'>
                            {errors.email && (
                                <span className='login-error'>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='input-container-login '>
                        <div className='password-input'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                placeholder='Enter password'
                                onChange={handlePasswordChange}
                            />
                            <button
                                type='button'
                                onClick={togglePasswordVisibility}
                                className='password-toggle-btn'>
                                {showPassword ? (
                                    <EyeOff size={18} strokeWidth={1.5} />
                                ) : (
                                    <Eye size={18} strokeWidth={1.5} />
                                )}
                            </button>
                        </div>
                        <div className='password-error'>
                            {errors.password && (
                                <span className='login-error'>
                                    {errors.password}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button className='login-button' type='submit'>
                            Log In
                        </Button>
                    </div>
                </form>
                <div className='new-user'>
                    <span>New User?</span>
                    <Link className='signup-button' to='/signup'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
