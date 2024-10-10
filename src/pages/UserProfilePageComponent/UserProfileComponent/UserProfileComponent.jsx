import React, { useContext, useEffect, useState } from 'react'
import './UserProfileComponent.css'
import { UserContext } from '../../../context/UserContext/UserContext'
import DummyProfileImage from '../../../assets/img/img2.png'
import BookCardComponent from '../../../components/BookCardComponent/BookCardComponent'
import fetchUserPreferences from '../../../services/fetchUserPreferences'
import ToggleReadingStatus from '../ToggleReadingStatus/ToggleReadingStatus'
import ToggleLikedAndBookmark from '../ToggleLikedAndBookmark/ToggleLikedAndBookmark'
import Button from '../../../components/ButtonComponent/ButtonComponent'

function UserProfileComponent() {
    const { userProfile } = useContext(UserContext)
    const [userBookmarks, setUserBookmarks] = useState([])
    const [userLikedBooks, setUserLikedBooks] = useState([])
    const [selectedReadingStatus, setSelectedReadingStatus] =
        useState('currentlyReading')
    const [showLikedBooks, setShowLikedBooks] = useState(true)
    if (!userProfile) {
        return <div>Loading...</div>
    }

    useEffect(() => {
        if (userProfile) {
            fetchUserPreferences()
                .then((data) => {
                    setUserBookmarks(data.preferences.bookmarkedBooks)
                    console.log(data.preferences.bookmarkedBooks)
                    setUserLikedBooks(data.preferences.likedBooks)
                    console.log(data.preferences.likedBooks)
                })
                .catch((error) => {
                    console.error('Error fetching preferences', error)
                })
        }
    }, [userProfile])

    const filteredBookmarks = userBookmarks.filter(
        (bookmark) => bookmark.readingStatus === selectedReadingStatus
    )

    return (
        <div className='profile-container'>
            <div className='profile-header'>
                <div className='profile-image-container'>
                    <img
                        src={DummyProfileImage}
                        alt='Profile'
                        className='profile-image'
                    />
                    <div className='status-indicator'></div>
                </div>
                <div className='profile-info'>
                    <h1 className='profile-name'>
                        {userProfile && userProfile.name}
                    </h1>
                    <p className='profile-location'>
                        {userProfile && userProfile.email}
                    </p>
                </div>
                <div className='profile-actions'>
                    <Button className='edit-profile-btn'>Edit Profile</Button>
                </div>
            </div>
            <nav className='profile-nav'>
                <ul>
                    <li
                        className={showLikedBooks ? 'active' : ''}
                        onClick={() => setShowLikedBooks(true)}>
                        <a href='#liked-books'>Liked Books</a>
                    </li>
                    <li
                        className={showLikedBooks ? '' : 'active'}
                        onClick={() => setShowLikedBooks(false)}>
                        <a href='#collections'>Collections</a>
                    </li>
                </ul>
            </nav>
            <div className='profile-content'>
                <ToggleLikedAndBookmark
                    showLikedBooks={showLikedBooks}
                    setShowLikedBooks={setShowLikedBooks}
                />
                {showLikedBooks && (
                    <div className='liked-books-list'>
                        {userLikedBooks.map((book, index) => (
                            <BookCardComponent key={index} book={book} />
                        ))}
                    </div>
                )}

                {!showLikedBooks && (
                    <>
                        <ToggleReadingStatus
                            selectedReadingStatus={selectedReadingStatus}
                            setSelectedReadingStatus={setSelectedReadingStatus}
                        />
                        <div className='bookmark-list'>
                            {filteredBookmarks.map((bookmark, index) => (
                                <BookCardComponent
                                    key={index}
                                    book={bookmark.book}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserProfileComponent
