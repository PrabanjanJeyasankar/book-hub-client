import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import EditBookComponent from '../EditBookComponent/EditBookComponent';
import DeleteABookComponent from '../DeleteABookComponent/DeleteABookComponent';
import './OverlayABookComponent.css';

function OverlayABookComponent({ bookData, onClose }) {
    const overlayRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditClose = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const handleDeleteClose = () => {
        setIsDeleting(false);
    };

    return (
        <div className='overlay'>
            <div className='overlay-content' ref={overlayRef}>
                <button className='close-button' onClick={onClose}>
                    <X size={24} />
                </button>
                {isEditing ? (
                    <EditBookComponent 
                        bookId={bookData.isbn} 
                        onClose={handleEditClose} 
                        onEditSuccess={() => {
                            handleEditClose();
                            // Optionally handle other logic after success
                        }}
                    />
                ) : isDeleting ? (
                    <DeleteABookComponent 
                        bookData={bookData} 
                        onClose={handleDeleteClose}
                        onBookDeleted={onClose} 
                    />
                ) : (
                    <div className='overlay-book-details'>
                        <img
                            src={`http://localhost:3500/api/v1/${bookData.coverImage}`}
                            alt={bookData.title}
                        />
                        <div className='overlay-details-action-container'>
                            <div className='overlay-book-info'>
                                <h3>{bookData.title}</h3>
                                <p>Author: {bookData.author}</p>
                                <p>Genre: {bookData.genre}</p>
                                <p>Description: {bookData.description}</p>
                                <p>Publisher: {bookData.publisher}</p>
                                <p>
                                    Publication Date:{' '}
                                    {new Date(bookData.publicationDate).toLocaleDateString()}
                                </p>
                                <p>Available Copies: {bookData.availableCopies}</p>
                            </div>
                            <div className='edit-details'>
                                <button className='delete-button' onClick={handleDeleteClick}>
                                    Delete Book
                                </button>
                                <button className='edit-button' onClick={handleEditClick}>
                                    Edit Book
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OverlayABookComponent;
