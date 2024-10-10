import React from 'react'

const ToggleLikedAndBookmark = ({ showLikedBooks, setShowLikedBooks }) => {
    return (
        <div className='toggle-liked-bookmarks'>
            <button
                className={`toggle-button ${!showLikedBooks ? 'active' : ''}`}
                onClick={() => setShowLikedBooks(false)}
            >
                Collections
            </button>
            <button
                className={`toggle-button ${showLikedBooks ? 'active' : ''}`}
                onClick={() => setShowLikedBooks(true)}
            >
                Liked Books
            </button>
        </div>
    )
}

export default ToggleLikedAndBookmark
