import React, { useState } from 'react' 
import UserForm from '../../SharedComponents/UserFormComponent/UserFormComponent' 
import ModalComponent from '../../SharedComponents/PopupComponents/InformationPopupComponent/InformationPopupComponent' 
import axiosInstance from '../../../utils/axiosInstance' 
 
function AddUserComponent() { 
    const [isModalOpen, setIsModalOpen] = useState(false) 
    const [modalContent, setModalContent] = useState({ 
        title: '', 
        body: '', 
        imageSrc: '', 
    }) 
 
    const handleAddUser = (formData) => { 
        axiosInstance 
            .post('/admin/create-user', formData) 
            .then((response) => { 
                if (response.status == 201) { 
                    setModalContent({ 
                        title: 'Success!', 
                        body: 'User has been created successfully.', 
                        imageSrc: 'successImage', 
                    }) 
                    setIsModalOpen(true) 
                } 
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
                isAdminPanel 
                showRole 
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
