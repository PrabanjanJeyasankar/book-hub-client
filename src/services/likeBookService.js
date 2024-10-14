import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'

const likeBookService = async (bookId, isLiked) => {
    const response = await axiosInstance.post(
        `/book/like`,
        { bookId, isLiked },
        { withCredentials: true }
    )

    if (response.status !== 200) {
        throw new Error('Failed to update like status')
    }
    return response.data
}

export default likeBookService
