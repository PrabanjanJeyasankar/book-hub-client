import React from 'react'
import UserForm from '../../components/common/UserFormComponent/UserFormComponent'
import axios from 'axios'

function AddUserComponent() {
    const handleAddUser = (formData) => {
        axios
            .post('http://localhost:3500/api/v1/user/add', formData, {
                withCredentials: true,
            })
            .then((response) => {
                console.log('User created successfully:', response)
            })
            .catch((error) => {
                console.error('Error adding user:', error)
            })
    }

    return (
        <UserForm
            title='Create User'
            buttonText='Add User'
            onSubmit={handleAddUser}
            isAdminPanel={true}
            showRole={true}
        />
    )
}

export default AddUserComponent
