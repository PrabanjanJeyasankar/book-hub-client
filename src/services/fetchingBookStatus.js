import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const fetchingBookStatus = (bookId, userProfile) => {
    const [isUserLiked, setIsUserLiked] = useState(false)
    const [isUserBookmarked, setIsUserBookmarked] = useState(false)
    const [bookmarkStatus, setBookmarkStatus] = useState('')

    useEffect(() => {
        if (userProfile) {
            axiosInstance
                .get(
                    `/book/user-preference/${bookId}`,
                    { withCredentials: true }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setIsUserLiked(response.data.liked)
                        setIsUserBookmarked(response.data.bookmarked)
                        setBookmarkStatus(response.data.readingStatus)
                    }
                })
                .catch((error) => {
                    console.error(
                        'Error fetching bookmark status:',
                        error.response
                    )
                })
        }
    }, [bookId, userProfile])

    return {
        isUserLiked,
        setIsUserLiked,
        isUserBookmarked,
        bookmarkStatus,
        setIsUserBookmarked,
    }
}

export default fetchingBookStatus
