import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../../components/common/UserFormComponent/UserFormComponent'
import { UserContext } from '../../context/UserContext/UserContext'
import axios from 'axios'

function Signup() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignup = (formData) => {
        axios
            .post('http://localhost:3500/api/v1/user/signup', formData, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response)
                setIsLoggedIn(true)
                setUserProfile(response.data.user)
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
