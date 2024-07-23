import React, { useState } from 'react'
import './Login.css'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!email) newErrors.email = '* Email is required'
        if (!password) newErrors.password = '* Password is required'

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            console.log({ email, password })
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='inputContainer'>
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
                                <span className='error'>{errors.email}</span>
                            )}
                        </div>
                    </div>
                    <div className='inputContainer'>
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
                                <span className='error'>{errors.password}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <button className='login-button' type='submit'>
                            Log In
                        </button>
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
