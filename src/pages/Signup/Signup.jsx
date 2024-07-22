import React, { useState } from 'react'
import './Signup.css'
import { Eye, EyeOff, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!firstName) newErrors.firstName = '* First Name is required'
        if (!email) newErrors.email = '* Email is required'
        if (!password) newErrors.password = '* Password is required'

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            console.log({ firstName, lastName, email, password })
        }
    }
    const handleFirstNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
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
        <div className='signup-container'>
            {/* <div className='back-btn-container'>
                <Link className='back-btn' to='/'>
                    <ChevronLeft size={40} strokeWidth={1} />
                </Link>
            </div> */}
            <div className='signup-content'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-container'>
                        <div className='inputContainer'>
                            <div className='first-name-input'>
                                <input
                                    id='firstName'
                                    type='text'
                                    placeholder='First Name*'
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </div>
                            <div className='first-name-error'>
                                {errors.firstName && (
                                    <span className='error'>
                                        {errors.firstName}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <div className='last-name-input'>
                                <input
                                    id='lastName'
                                    type='text'
                                    placeholder='Last Name*'
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <div className='email-input'>
                                <input
                                    id='email'
                                    type='email'
                                    placeholder='Email*'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className='email-error'>
                                {errors.email && (
                                    <span className='error'>
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='inputContainer'>
                            <div className='password-input'>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    placeholder='Password*'
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
                                    <span className='error'>
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <button className='sign-up-btn' type='submit'>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
                <div className='existing-user'>
                    <span>Existing User?</span>
                    <Link className='loginButton' to='/login'>
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
