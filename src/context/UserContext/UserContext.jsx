import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const storedUserProfile = localStorage.getItem('userProfile')
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

    const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true')
    const [userProfile, setUserProfile] = useState(
        storedUserProfile ? JSON.parse(storedUserProfile) : null
    )

    // Synchronize isLoggedIn with localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString())
    }, [isLoggedIn])

    // Synchronize userProfile with localStorage
    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile))
        } else {
            localStorage.removeItem('userProfile') // Clear localStorage if no profile
        }
    }, [userProfile])

    return (
        <UserContext.Provider
            value={{ isLoggedIn, userProfile, setIsLoggedIn, setUserProfile }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext)
}

export { UserContext, UserProvider, useUserContext }
