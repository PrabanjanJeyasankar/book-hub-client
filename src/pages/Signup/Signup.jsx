import React, { useState } from 'react'
import './Signup.css'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!name) newErrors.name = '* Name is required'
        if (!email) newErrors.email = '* Email is required'
        if (!password) newErrors.password = '* Password is required'

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            console.log({ name, email, password })
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
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
            <div className='signup-content'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-container'>
                        <div className='inputContainer'>
                            <div className='name-input'>
                                <input
                                    id='name'
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className='name-error'>
                                {errors.name && (
                                    <span className='error'>{errors.name}</span>
                                )}
                            </div>
                        </div>
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
