import axios from 'axios'

const likeBookService = async (bookId, isLiked) => {
    const response = await axios.post(
        `http://localhost:3500/api/v1/book/like`,
        { bookId, isLiked },
        { withCredentials: true }
    )

    if (response.status !== 200) {
        throw new Error('Failed to update like status')
    }
    return response.data
}

export default likeBookService
