import AxiosInstance from '../utils/axiosInstance'

const deleteUserService = async (userId) => {
    try {
        const response = await AxiosInstance.delete(`/admin/delete-user/${userId}`)

        // Assuming the response contains a success flag
        return {
            success: true,
            data: response.data, // You might want to return data if needed
        }
    } catch (error) {
        console.error('Error deleting user:', error)

        // Handle the error response from the server
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : 'Network error',
        }
    }
}

export default deleteUserService
