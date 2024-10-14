import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext/UserContext'

import UserForm from '../../components/SharedComponents/UserFormComponent/UserFormComponent'
import axiosInstance from '../../utils/axiosInstance'

function Signup() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignup = (formData) => {
        axiosInstance
            .post('/user/signup', formData)
            .then((response) => {
                console.log(response)
                // setIsLoggedIn(true)
                // setUserProfile(response.data.user)
                setIsLoggedIn(true)
                setUserProfile(response.data.userProfile)
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(response.data.userProfile)
                )
                localStorage.setItem('isLoggedIn', 'true')
                navigate('/')
            })
            .catch((error) => {
                console.error('Signup error:', error)
            })
    }

    return (
        <UserForm
            title='Sign Up'
            buttonText='Sign Up'
            isAdminPanel={false}
            onSubmit={handleSignup}
            showRole={false}
        />
    )
}

export default Signup
