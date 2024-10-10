import axios from 'axios'

const fetchUserPreferences = async () => {
    try {
        const response = await axios.get(
            'http://localhost:3500/api/v1/book/users-preference',
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