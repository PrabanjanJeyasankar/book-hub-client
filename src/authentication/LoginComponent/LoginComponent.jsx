import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { validateLoginInputs } from '../../utils/authenticationFieldsValidation'

import InputFieldComponent from '../../components/SharedComponents/InputFieldComponent/InputFieldComponent'
import AppLogo from '../../../src/assets/img/open_book_logo.webp'
import handleLoginService from '../../services/authenticationServices/handleLoginService'
import loginStyles from './LoginComponent.module.css'
import toast from 'react-hot-toast'
import ButtonComponent from '../../components/SharedComponents/ButtonComponent/ButtonComponent'
import SpinnerLoaderComponent from '../../components/SharedComponents/SpinnerLoaderComponent/SpinnerLoaderComponent'
import { UserContext } from '../../context/UserContext/UserContext'
import googleAuthService from '../../services/authenticationServices/googleAuthService'

function LoginComponent() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const { isValid, errors: validationErrors } = validateLoginInputs(
            formData.email,
            formData.password
        )

        if (isValid) {
            try {
                const response = await handleLoginService(formData)
      
                if (response.status === 200 && response.data) {
                    const userProfile = response.data.userProfile
                    setIsLoggedIn(true)
                    setUserProfile(userProfile)
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(userProfile)
                    )
                    localStorage.setItem('isLoggedIn', 'true')
                    toast.success('Login successful')
                    navigate('/')
                } else if (response.status === 400) {
                    toast.error(
                        'You have signed up using Google. Please log in using Google.'
                    )
                } else if (response.status === 401) {
                    toast.error('Incorrect Password.')
                } else if (response.status === 404) {
                    toast.error('User not found, please sign up.')
                }
            } catch (error) {
                toast.error('An error occurred during login. Please try again.')
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const handleGoogleLogInAuth = async () => {
        try {
            const url = await googleAuthService()
            location.href = url
        } catch (error) {
            console.log(error?.response?.data)
        }
    }

    return (
        <div className={loginStyles.container}>
            <form
                className={loginStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={loginStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={loginStyles.app_name}>Login</h1>
                <h1 className={loginStyles.title}>Welcome Back</h1>
                <p className={loginStyles.subtitle}>
                    Don&#39;t have an account?
                    <Link to='/signup' className={loginStyles.signup_link}>
                        Sign Up
                    </Link>
                </p>
                <InputFieldComponent
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder=' '
                    label='Email'
                    onChange={handleInputChange}
                    error={errors.email}
                    containerClass={loginStyles.inputGroup}
                    inputClass={loginStyles.input}
                    labelClass={loginStyles.label}
                    errorClass={loginStyles.error}
                />
                <div className={loginStyles.password_container}>
                    <InputFieldComponent
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        placeholder=' '
                        label='Password'
                        autoComplete='password'
                        onChange={handleInputChange}
                        error={errors.password}
                        containerClass={loginStyles.inputGroup}
                        inputClass={loginStyles.input}
                        labelClass={loginStyles.label}
                        errorClass={loginStyles.error}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className={loginStyles.eyeIcon}>
                        {showPassword ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='lucide lucide-eye'>
                                <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                                <circle cx='12' cy='12' r='3' />
                            </svg>
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='lucide lucide-eye-off'>
                                <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
                                <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
                                <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
                                <path d='m2 2 20 20' />
                            </svg>
                        )}
                    </span>
                </div>
                <Link to='/request-otp' className={loginStyles.forgot_password}>
                    Forgot password?
                </Link>
                <ButtonComponent
                    type='submit'
                    className={loginStyles.loginButton}>
                    {isLoading ? (
                        <span className={loginStyles.spinning_loader}>
                            <SpinnerLoaderComponent />
                        </span>
                    ) : null}
                    <span className={loginStyles.login_button_state_text}>
                        {isLoading ? 'Logging in...' : 'Login'}{' '}
                    </span>
                </ButtonComponent>
                <ButtonComponent
                    type='button'
                    className={loginStyles.googleButton}
                    onClick={handleGoogleLogInAuth}>
                    <svg
                        className={loginStyles.googleIcon}
                        viewBox='0 0 24 24'>
                        <path
                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                            fill='#4285F4'
                        />
                        <path
                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                            fill='#34A853'
                        />
                        <path
                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                            fill='#FBBC05'
                        />
                        <path
                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                            fill='#EA4335'
                        />
                    </svg>
                    Login with Google
                </ButtonComponent>
            </form>
        </div>
    )
}

export default LoginComponent
