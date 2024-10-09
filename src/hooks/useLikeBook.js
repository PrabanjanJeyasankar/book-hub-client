import { useState } from 'react'
import likeBookService from '../services/likeBookService'

const useLikeBook = (bookId, isUserLiked, setIsUserLiked) => {
    const [isProcessing, setIsProcessing] = useState(false)

    const handleLikeClick = () => {
        if (isProcessing) return

        const newLikeStatus = !isUserLiked
        setIsUserLiked(newLikeStatus)
        setIsProcessing(true)

        likeBookService(bookId, newLikeStatus)
            .then(() => {
                if (newLikeStatus) {
                    console.log('Liked the book')
                } else {
                    console.log('Unliked the book')
                }
            })
            .catch((error) => {
                console.error('Error updating like status:', error)
                setIsUserLiked(!newLikeStatus)
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return { handleLikeClick, isProcessing }
}

export default useLikeBook
