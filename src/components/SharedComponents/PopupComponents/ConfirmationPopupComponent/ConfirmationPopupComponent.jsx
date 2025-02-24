import './ConfirmationPopupComponent.css'
import TrashCanImage from '../../../../assets/img/trash-can.png'

function ConfirmationPopupComponent({ isOpen, onConfirm, onCancel, bookData }) {
    if (!isOpen) return null

    const handleOverlayClick = () => {
        onCancel()
    }

    const handlePopupClick = (event) => {
        event.stopPropagation()
    }

    return (
        <div
            className='confirmation-popup-overlay'
            onClick={handleOverlayClick}>
            <div
                className='confirmation-popup-content'
                onClick={handlePopupClick}>
                <img
                    className='trash-can-image'
                    src={TrashCanImage}
                    alt='Trash Can'
                />
                <h2 className='confirmation-popup-title'>Delete Book?</h2>
                <p className='confirmation-popup-message'>
                    Are you sure you want to delete "{bookData?.title}"? This
                    action cannot be undone.
                </p>
                <div className='confirmation-popup-buttons'>
                    <button className='popup-cancel-button' onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className='popup-confirm-button'
                        onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopupComponent
