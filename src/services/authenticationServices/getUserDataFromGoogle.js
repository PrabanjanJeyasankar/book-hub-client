import axiosInstance from '../../utils/axiosInstance'

const getUserDataFromGoogle = async () => {
    const response = await axiosInstance.get('/google-auth/verify')

    return response
}

export default getUserDataFromGoogle
