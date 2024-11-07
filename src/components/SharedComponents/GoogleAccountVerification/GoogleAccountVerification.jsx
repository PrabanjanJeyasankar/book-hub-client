import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext/UserContext'
import getUserDataFromGoogle from '../../../services/authenticationServices/getUserDataFromGoogle'
import toast from 'react-hot-toast'

const GoogleAccountVerification = () => {
    const navigate = useNavigate()

    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)

    useEffect(() => {
        getUserDataFromGoogle()
            .then((response) => {
                if (response.status == 200) {
                    const userData = response.data.data
                    setIsLoggedIn(true)
                    setUserProfile(userData)

                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(userData)
                    )
                    localStorage.setItem('isLoggedIn', 'true')

                    navigate('/')
                    toast.success(`Logged in successfully`)
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    navigate('/login')
                    toast.error(
                        'You have already signed up using google. Please log in to continue.'
                    )
                } else if (error.response.status === 401) {
                    navigate('/signup')
                    toast.error(
                        'User does not exist. Please sign up to continue.'
                    )
                }
                console.log(error)
            })
    }, [])

    return <div></div>
}

export default GoogleAccountVerification
