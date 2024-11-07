import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import './UserProfileComponent.css'

import LottieSearchNotFound from '../../../SharedComponents/AnimationComponents/SearchNotFoundAnimation'
import BookCardComponent from '../../../SharedComponents/BookCardComponent/BookCardComponent'
import fetchUserPreferences from '../../../../services/fetchUserPreferences'
import ToggleReadingStatus from '../ToggleReadingStatus/ToggleReadingStatus'
import ToggleLikedAndBookmark from '../ToggleLikedAndBookmark/ToggleLikedAndBookmark'
import ProfilePictureUploadComponent from '../ProfilePictureUploadComponent/ProfilePictureUploadComponent'
import PageLoadingAnimation from '../../../SharedComponents/PageLoadingAnimation/PageLoadingAnimation'
function UserProfileComponent() {
    const { userProfile } = useContext(UserContext)
    const navigate = useNavigate()
    const [userBookmarks, setUserBookmarks] = useState([])
    const [userLikedBooks, setUserLikedBooks] = useState([])
    const [selectedReadingStatus, setSelectedReadingStatus] =
        useState('currentlyReading')
    const [showLikedBooks, setShowLikedBooks] = useState(true)

    useEffect(() => {
        if (userProfile) {
            fetchUserPreferences()
                .then((data) => {
                    if (data.preferences) {
                        if (data.preferences.bookmarkedBooks?.length) {
                            setUserBookmarks(data.preferences.bookmarkedBooks)
                        }
                        if (data.preferences.likedBooks?.length) {
                            setUserLikedBooks(data.preferences.likedBooks)
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching preferences', error)
                })
        }
    }, [userProfile])

    const filteredBookmarks = userBookmarks.filter(
        (bookmark) => bookmark.readingStatus === selectedReadingStatus
    )

    if (!userProfile) {
        return (
            <div>
                <PageLoadingAnimation />
            </div>
        )
    }

    return (
        <div className='profile-container'>
            <div className='profile-header'>
                <ProfilePictureUploadComponent />
                <div className='profile-info'>
                    <h1 className='profile-name'>{userProfile.name}</h1>
                    <p className='profile-email'>{userProfile.email}</p>
                </div>
            </div>
            <div className='profile-content'>
                <ToggleLikedAndBookmark
                    showLikedBooks={showLikedBooks}
                    setShowLikedBooks={setShowLikedBooks}
                />

                {showLikedBooks ? (
                    <div
                        className={`liked-books-list ${
                            !showLikedBooks
                                ? ''
                                : 'book-preference-flex-display'
                        }`}>
                        {userLikedBooks.length > 0 ? (
                            userLikedBooks.map((book, index) => (
                                <BookCardComponent key={index} book={book} />
                            ))
                        ) : (
                            <div className='no-preferences-message-container'>
                                <LottieSearchNotFound />
                                <p className='no-preferences-message'>
                                    Your liked and bookmarked books will be
                                    displayed here...
                                </p>
                                <Link
                                    to='/search'
                                    className='find-books-button'
                                    onClick={() => navigate('/search-books')}>
                                    <Search size={18} />
                                    <span>Find Books</span>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <ToggleReadingStatus
                            selectedReadingStatus={selectedReadingStatus}
                            setSelectedReadingStatus={setSelectedReadingStatus}
                        />

                        <div
                            className={`bookmark-list ${
                                !showLikedBooks
                                    ? 'book-preference-flex-display'
                                    : ''
                            }`}>
                            {filteredBookmarks.length > 0 ? (
                                filteredBookmarks.map((bookmark, index) => (
                                    <BookCardComponent
                                        key={index}
                                        book={bookmark.book}
                                    />
                                ))
                            ) : (
                                <div className='no-preferences-message-container'>
                                    <LottieSearchNotFound />
                                    <p className='no-preferences-message'>
                                        Your liked and bookmarked books will be
                                        displayed here...
                                    </p>
                                    <Link
                                        to='/search'
                                        className='find-books-button'
                                        onClick={() =>
                                            navigate('/search-books')
                                        }>
                                        <Search size={18} />
                                        <span>Find Books</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserProfileComponent
