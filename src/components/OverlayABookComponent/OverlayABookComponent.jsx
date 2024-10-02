import React, { useState, useRef, useEffect } from 'react'
import { X, CirclePlus, Heart, Pencil, Trash } from 'lucide-react'
import EditBookComponent from '../EditBookComponent/EditBookComponent'
import DeleteABookComponent from '../DeleteABookComponent/DeleteABookComponent'
import './OverlayABookComponent.css'
import ModalComponent from '../ModalComponent/ModalComponent'

function OverlayABookComponent({ book, onClose }) {
    const overlayRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: '',
        imageSrc: '',
        body: '',
    })

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleEditClose = () => {
        setIsEditing(false)
    }

    const handleDeleteClick = () => {
        setModalContent({
            title: 'Confirm Deletion',
            imageSrc: 'path/to/delete-image.png',
            body: `Are you sure you want to delete "${book.title}"?`,
        })
        setIsModalOpen(true)
    }

    const handleDeleteClose = () => {
        setIsDeleting(false)
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
                        onEditSuccess={() => {
                            handleEditClose()
                        }}
                    />
                ) : isDeleting ? (
                    <DeleteABookComponent
                        book={book}
                        onClose={handleDeleteClose}
                        onBookDeleted={onClose}
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
                                        <CirclePlus size={28} strokeWidth={2} />
                                        <Heart size={28} strokeWidth={2} />
                                    </div>
                                </div>
                                <div className='overlay-book-details'>
                                    <div className='overlay-book-description'>
                                        {/* <h3>Description </h3> */}
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
                            <div className='edit-details'>
                                <button
                                    className='delete-button'
                                    onClick={handleDeleteClick}>
                                    <Trash size={14} />
                                    Delete Book
                                </button>
                                <button
                                    className='edit-button'
                                    onClick={handleEditClick}>
                                    <Pencil size={14} />
                                    Edit Book
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalComponent
                popupMessageTitle={modalContent.title}
                popupImageSrc={modalContent.imageSrc}
                popupMessageBody={modalContent.body}
                isOpen={isModalOpen}
                onClose={handleDeleteClose}
            />
        </div>
    )
}

export default OverlayABookComponent
