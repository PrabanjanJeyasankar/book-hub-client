import axiosInstance from '../utils/axiosInstance'

const fetchUserProfilePicture = async () => {
    try {
        const response = await axiosInstance.get('/user/profile-picture', {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export default fetchUserProfilePicture
