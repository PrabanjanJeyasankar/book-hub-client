import React, { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import './BookmarkComponent.css'
import addBookToUserPreference from '../../services/addBookToUserPreference'

function BookmarkComponent({
    bookId,
    isUserBookmarked,
    setIsUserBookmarked,
    readingState,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [bookmarkStatus, setBookmarkStatus] = useState(null)

    useEffect(() => {
        if (readingState) {
            setBookmarkStatus(readingState)
            setIsUserBookmarked(true)
        } else {
            setBookmarkStatus('none')
            setIsUserBookmarked(false)
        }
    }, [readingState, setIsUserBookmarked])

    const handleBookmarkClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleOptionClick = (status) => {
        if (status === bookmarkStatus) {
            setBookmarkStatus('none')
            setIsUserBookmarked(false)
            addBookToUserPreference(bookId, 'none')
        } else {
            setBookmarkStatus(status)
            setIsUserBookmarked(true)
            addBookToUserPreference(bookId, status)
        }
        setIsDropdownOpen(false)
    }

    return (
        <div className='bookmark_container'>
            <Bookmark
                className={`bookmark_icon ${
                    isUserBookmarked ? 'bookmarked' : ''
                } ${bookmarkStatus ? bookmarkStatus : ''}`}
                size={26}
                strokeWidth={2}
                onClick={handleBookmarkClick}
            />
            {isDropdownOpen && (
                <div className='bookmark__dropdown'>
                    <div
                        className={`bookmark_dropdown_option ${
                            bookmarkStatus === 'finishedReading'
                                ? 'selected'
                                : ''
                        }`}
                        id='finished_reading_option'
                        onClick={() => handleOptionClick('finishedReading')}>
                        Finished Reading
                    </div>
                    <div
                        className={`bookmark_dropdown_option ${
                            bookmarkStatus === 'currentlyReading'
                                ? 'selected'
                                : ''
                        }`}
                        id='currently_reading_option'
                        onClick={() => handleOptionClick('currentlyReading')}>
                        Currently Reading
                    </div>
                    <div
                        className={`bookmark_dropdown_option ${
                            bookmarkStatus === 'wantToRead' ? 'selected' : ''
                        }`}
                        id='want_to_read_option'
                        onClick={() => handleOptionClick('wantToRead')}>
                        Want to Read
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookmarkComponent
