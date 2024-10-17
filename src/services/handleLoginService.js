import axiosInstance from '../utils/axiosInstance'

const handleLoginService = async (email, password) => {
    try {
        const response = await axiosInstance.post('/user/login', {
            email,
            password,
        })
        return response.data
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

export default handleLoginService
