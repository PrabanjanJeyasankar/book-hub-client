import React, { useState } from 'react'
import UserForm from '../../components/common/UserFormComponent/UserFormComponent'
import axios from 'axios'
import ModalComponent from '../../components/PopupComponents/InformationPopupComponent/InformationPopupComponent'

function AddUserComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: '',
        body: '',
        imageSrc: '',
    })

    const handleAddUser = (formData) => {
        axios
            .post('http://localhost:3500/api/v1/admin/create-user', formData, {
                withCredentials: true,
            })
            .then((response) => {
                setModalContent({
                    title: 'Success!',
                    body: 'User has been created successfully.',
                    imageSrc: 'success',
                })
                setIsModalOpen(true)
            })
            .catch((error) => {
                console.error('Error adding user:', error)
                setModalContent({
                    title: 'Error!',
                    body: 'There was an error creating the user.',
                    imageSrc: 'errorImage',
                })
                setIsModalOpen(true)
            })
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <UserForm
                title='Create User'
                buttonText='Add User'
                onSubmit={handleAddUser}
                isAdminPanel={true}
                showRole={true}
            />
            <ModalComponent
                popupMessageTitle={modalContent.title}
                popupMessageBody={modalContent.body}
                popupImageSrc={modalContent.imageSrc}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default AddUserComponent
