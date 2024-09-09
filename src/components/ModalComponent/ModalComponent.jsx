import React from 'react'
import './ModalComponent.css' // Adjust the path as needed
import greenTickImagePath from '../../assets/img/accept.png'

const ModalComponent = ({ title, imageSrc, messageBody, isOpen, onClose }) => {
    if (!isOpen) return null // If not open, render nothing
    console.log('ModalComponent props:', {
        title,
        imageSrc,
        messageBody,
        isOpen,
    })
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close-button' onClick={onClose}>
                    &times;
                </button>
                {imageSrc && (
                    <img src={imageSrc} alt='Popup' className='popup-image' />
                )}
                <h2 className='message-title'>{title}</h2>
                <p className='message-body'>{messageBody}</p>
                <button className='modal-close-bottom-button' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ModalComponent
