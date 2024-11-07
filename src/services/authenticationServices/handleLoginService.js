import axiosInstance from '../../utils/axiosInstance'

const handleLoginService = (formData) => {
    return axiosInstance
        .post('/user/login', formData)
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handleLoginService
