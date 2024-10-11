import { useState } from 'react'

const usePopup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [popupConfig, setPopupConfig] = useState({
        title: '',
        message: '',
        imageSrc: '',
    })

    const triggerPopup = (title, message, imageSrc) => {
        setPopupConfig({ title, message, imageSrc })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return { isModalOpen, popupConfig, triggerPopup, closeModal }
}

export default usePopup
