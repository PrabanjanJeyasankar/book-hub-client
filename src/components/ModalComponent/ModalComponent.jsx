import React from 'react'
import './ModalComponent.css'
function ModalComponent({ popupImageSrc, popupMessageTitle, popupMessageBody, isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <span className='modal-close' onClick={onClose}>
                &times;
                </span>
                <img src={popupImageSrc} alt="" />
                <div className='message-title'>{popupMessageTitle}</div>
                <div className='message-body'>{popupMessageBody}</div>
                <button className='modal-close-btn' onClick={onClose}>
                close
                </button>
            </div>
        </div>
    )
}

export default ModalComponent
