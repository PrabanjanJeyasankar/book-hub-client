import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'
import './OverlayABookComponent.css'

function OverlayABookComponent({ bookData, onClose }) {
    const overlayRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editFormData, setEditFormData] = useState(null)

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

    const handleEditClick = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3500/api/v1/book/${bookData.isbn}`
            )
            setEditFormData(response.data.book[0]) // Assuming the API returns an array
            setIsEditing(true)
        } catch (error) {
            console.error('Failed to fetch book details:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(
                `http://localhost:3500/api/v1/book/edit/${bookData.isbn}`,
                editFormData
            )
            onClose() // Close the overlay after successful edit
        } catch (error) {
            console.error('Failed to update book details:', error)
        }
    }

    return (
        <div className='overlay'>
            <div className='overlay-content' ref={overlayRef}>
                {!isEditing ? (
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
                                <button className='edit-button' onClick={handleEditClick}>
                                    Edit Book
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className='edit-book-form' onSubmit={handleFormSubmit}>
                        <div className='edit-form-container'>
                            <div className='inputContainer'>
                                <label htmlFor='title'>Title</label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={editFormData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='author'>Author</label>
                                <input
                                    type='text'
                                    name='author'
                                    id='author'
                                    value={editFormData.author}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='genre'>Genre</label>
                                <select
                                    name='genre'
                                    id='genre'
                                    value={editFormData.genre}
                                    onChange={handleInputChange}
                                >
                                    <option value='' disabled>Select Genre</option>
                                    <option value='Fiction'>Fiction</option>
                                    <option value='Non Fiction'>Non Fiction</option>
                                    <option value='Science Fiction'>Science Fiction</option>
                                    <option value='Fantasy'>Fantasy</option>
                                    <option value='Mystery'>Mystery</option>
                                    <option value='Biography'>Biography</option>
                                    <option value='Historical'>Historical</option>
                                    <option value='Romance'>Romance</option>
                                    <option value='Thriller'>Thriller</option>
                                    <option value='Self-Help'>Self-Help</option>
                                    <option value='Horror'>Horror</option>
                                </select>
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='publisher'>Publisher</label>
                                <input
                                    type='text'
                                    name='publisher'
                                    id='publisher'
                                    value={editFormData.publisher}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='isbn'>ISBN</label>
                                <input
                                    type='text'
                                    name='isbn'
                                    id='isbn'
                                    value={editFormData.isbn}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='publicationDate'>Publication Date</label>
                                <input
                                    type='date'
                                    name='publicationDate'
                                    id='publicationDate'
                                    value={editFormData.publicationDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='language'>Language</label>
                                <input
                                    type='text'
                                    name='language'
                                    id='language'
                                    value={editFormData.language}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    name='description'
                                    id='description'
                                    value={editFormData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='availableCopies'>Available Copies</label>
                                <input
                                    type='number'
                                    name='availableCopies'
                                    id='availableCopies'
                                    value={editFormData.availableCopies}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='inputContainer'>
                                <label htmlFor='coverImage'>Cover Image</label>
                                <input
                                    type='file'
                                    name='coverImage'
                                    id='coverImage'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='action-buttons'>
                            <button type='submit'>Save Changes</button>
                            <button type='button' onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                )}
                <button className='close-button' onClick={onClose}>
                    <X size={24} />
                </button>
            </div>
        </div>
    )
}

export default OverlayABookComponent


// import React, { useEffect, useRef } from 'react'
// import { X } from 'lucide-react'
// import './OverlayABookComponent.css'

// function OverlayABookComponent({ bookData, onClose }) {
//     const overlayRef = useRef(null)

//     const handleClickOutside = (event) => {
//         if (overlayRef.current && !overlayRef.current.contains(event.target)) {
//             onClose()
//         }
//     }

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [])

//     return (
//         <div className='overlay'>
//             <div className='overlay-content' ref={overlayRef}>
//                 <div className='overlay-book-details'>
//                     <img
//                         src={`http://localhost:3500/api/v1/${bookData.coverImage}`}
//                         alt={bookData.title}
//                     />
//                     <div className='overlay-details-action-container'>
//                         <div className='overlay-book-info'>
//                             <h3>{bookData.title}</h3>
//                             <p>Author: {bookData.author}</p>
//                             <p>Genre: {bookData.genre}</p>
//                             <p>Description: {bookData.description}</p>
//                             <p>Publisher: {bookData.publisher}</p>
//                             <p>
//                                 Publication Date:{' '}
//                                 {new Date(bookData.publicationDate).toLocaleDateString()}
//                             </p>
//                             <p>Available Copies: {bookData.availableCopies}</p>
//                         </div>
//                         <div className='edit-details'>
//                             <button className='edit-button'>Edit Book</button>
//                         </div>
//                     </div>
//                 </div>
//                 <button className='close-button' onClick={onClose}>
//                     <X size={24} />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default React.forwardRef(OverlayABookComponent)
