import React, { useState, useRef, useEffect, useContext } from 'react'
import { X, Bookmark, Pencil, Trash } from 'lucide-react'
import EditBookComponent from '../../components/EditBookComponent/EditBookComponent'
import DeleteBookComponent from '../../components/DeleteABookComponent/DeleteABookComponent'
import './OverlayABookComponent.css'
import ConfirmationPopupComponent from '../PopupComponents/ConfirmationPopupComponent/ConfirmationPopupComponent'
import { UserContext } from '../../context/UserContext/UserContext'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import axios from 'axios'

function OverlayABookComponent({ book, onClose }) {
    const overlayRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
        useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)
    const [confirmDeletionProceed, setConfirmDeletionProceed] = useState(false)
    const { userProfile } = useContext(UserContext)
    const [isUserLiked, setIsUserLiked] = useState(false)

    const bookId = book._id

    useEffect(() => {
        if (userProfile) {
            axios
                .get(
                    `http://localhost:3500/api/v1/book/user-preference/${bookId}`,
                    { withCredentials: true }
                )
                .then((response) => {
                    if (response.status == 200) {
                        setIsUserLiked(response.data.liked)
                        console.log(response.data.liked)
                        console.log(response.data.message)
                    }
                })
                .catch((error) => {
                    console.error(
                        'Error fetching liked status:',
                        error.response
                    )
                })
        }
    }, [bookId, userProfile])

    const handleClickOutside = (event) => {
        if (
            overlayRef.current &&
            !overlayRef.current.contains(event.target) &&
            !isConfirmationPopupOpen
        ) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isConfirmationPopupOpen])

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleEditClose = () => {
        setIsEditing(false)
    }

    const handleTrashClick = () => {
        setBookToDelete(book)
        setIsConfirmationPopupOpen(true)
    }

    const handleCancelDeletion = () => {
        setIsConfirmationPopupOpen(false)
    }

    const handleConfirmDeletion = () => {
        setIsConfirmationPopupOpen(false)
        setConfirmDeletionProceed(true)
    }

    return (
        <div className='overlay'>
            <div className='overlay-content' ref={overlayRef}>
                <button className='close-button' onClick={onClose}>
                    <X size={24} />
                </button>
                {isEditing ? (
                    <EditBookComponent
                        bookId={book.isbn}
                        onClose={handleEditClose}
                    />
                ) : (
                    <div className='overlay-book-container'>
                        <img
                            src={`http://localhost:3500/api/v1/${book.coverImage}`}
                            alt={book.title}
                        />
                        <div className='overlay-details-action-container'>
                            <div className='overlay-book-info'>
                                <div className='overlay-header'>
                                    <div className='overlay-title-author'>
                                        <h3 className='overlay-header-title'>
                                            {book.title}
                                        </h3>
                                        <p className='overlay-header-author'>
                                            by {book.author}
                                        </p>
                                    </div>
                                    <div className='overlay-actions'>
                                        {userProfile?.role === 'user' && (
                                            <>
                                                <Bookmark
                                                    className='bookmark-icon'
                                                    size={26}
                                                    strokeWidth={2}
                                                />
                                                <LikeButtonComponent
                                                    bookId={bookId}
                                                    isUserLiked={isUserLiked}
                                                    setIsUserLiked={
                                                        setIsUserLiked
                                                    }
                                                />
                                            </>
                                        )}
                                        {userProfile?.role === 'admin' && (
                                            <>
                                                <Trash
                                                    className='delete-icon'
                                                    size={26}
                                                    onClick={handleTrashClick}
                                                    strokeWidth={2}
                                                />
                                                <Pencil
                                                    className='edit-icon'
                                                    onClick={handleEditClick}
                                                    size={26}
                                                    strokeWidth={2}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='overlay-book-details'>
                                    <div className='overlay-book-description'>
                                        <p>{book.description}</p>
                                    </div>
                                    <div className='overlay-book-grid-container'>
                                        <div className='overlay-book-other-details'>
                                            <div className='overlay-book-details-grid'>
                                                <h3>{book.genre}</h3>
                                                <p>Genre</p>
                                            </div>
                                            <div className='overlay-book-details-grid'>
                                                <h3>{book.language}</h3>
                                                <p>Language</p>
                                            </div>
                                            <div className='overlay-book-details-grid'>
                                                <h3>{book.publisher}</h3>
                                                <p>Publisher</p>
                                            </div>
                                            <div className='overlay-book-details-grid'>
                                                <h3>
                                                    {new Date(
                                                        book.publicationDate
                                                    ).getFullYear()}
                                                </h3>
                                                <p>Year</p>
                                            </div>
                                            <div className='overlay-book-details-grid'>
                                                <h3>000</h3>
                                                <p>Pages</p>
                                            </div>
                                            <div className='overlay-book-details-grid'>
                                                <h3>{book.availableCopies}</h3>
                                                <p>Available Copies</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isConfirmationPopupOpen && (
                <ConfirmationPopupComponent
                    isOpen={isConfirmationPopupOpen}
                    onConfirm={handleConfirmDeletion}
                    onCancel={handleCancelDeletion}
                    bookData={bookToDelete}
                />
            )}
            {confirmDeletionProceed && (
                <DeleteBookComponent
                    bookData={bookToDelete}
                    onClose={onClose}
                    onDelete={() => setConfirmDeletionProceed(false)}
                />
            )}
        </div>
    )
}

export default OverlayABookComponent
