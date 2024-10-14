import axiosInstance from '../utils/axiosInstance'

const fetchUserPreferences = async () => {
    try {
        const response = await axiosInstance.get(
            '/book/users-preference',
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (error) {
        console.error('Error fetching user preferences:', error)
        throw error
    }
}

export default fetchUserPreferences