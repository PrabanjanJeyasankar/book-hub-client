import React, { useRef } from 'react'
import './InformationPopupComponent.css'
import ThumbsUpImage from '../../../assets/img/thumb-up.png'
import RepairImage from '../../../assets/img/error-tool.png'
import TrashCanImage from '../../../assets/img/trash-can.png'
import { X } from 'lucide-react'

const images = {
    success: ThumbsUpImage,
    error: RepairImage,
    delete: TrashCanImage,
}

function InformationPopupComponent({
    popupMessageTitle,
    popupImageSrc,
    popupMessageBody,
    isOpen,
    onClose,
}) {
    const contentRef = useRef(null)

    const handleOverlayClick = (event) => {
        if (contentRef.current && !contentRef.current.contains(event.target)) {
            onClose()
        }
    }

    const imageToShow = images[popupImageSrc] || null

    if (!isOpen) return null

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content' ref={contentRef}>
                <button className='modal-close-button' onClick={onClose}>
                    <X size={22} strokeWidth={2} />
                </button>
                {imageToShow && (
                    <img
                        src={imageToShow}
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

export default InformationPopupComponent
