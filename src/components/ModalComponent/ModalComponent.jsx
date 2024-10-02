import React from 'react'
import './ModalComponent.css'
const ModalComponent = ({
    popupMessageTitle,
    popupImageSrc,
    popupMessageBody,
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close-button' onClick={onClose}>
                    &times;
                </button>
                {popupImageSrc && (
                    <img
                        src={popupImageSrc}
                        alt='Popup'
                        className='popup-image'
                    />
                )}
                <h2 className='message-title'>{popupMessageTitle}</h2>
                <p className='message-body'>{popupMessageBody}</p>
                <button className='modal-close-bottom-button' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ModalComponent
