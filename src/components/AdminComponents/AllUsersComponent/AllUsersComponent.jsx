import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import fetchAllUsersService from '../../../services/fetchAllUsersService'
import deleteUserService from '../../../services/deleteUserService'
import './AllUsersComponent.css'
import PageLoadingAnimation from '../../SharedComponents/PageLoadingAnimation/PageLoadingAnimation'
import DefaultUserProfileImage from '../../../assets/img/default_user_profile.webp'

const AllUsersComponent = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const fetchedUsers = await fetchAllUsersService()
            if (fetchedUsers.length > 0) {
                setUsers(fetchedUsers)
            } else {
                setError('No users found.')
            }
            setLoading(false)
        }

        fetchUsers()
    }, [])

    console.log(users)

    const handleDeleteUser = async (userId) => {
        try {
            const response = await deleteUserService(userId)
            if (response.success) {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user._id !== userId)
                )
            } else {
                setDeleteError('Failed to delete user.')
            }
        } catch (error) {
            setDeleteError('Error deleting user.')
        }
    }

    if (loading)
        return (
            <div>
                <PageLoadingAnimation />
            </div>
        )
    if (error) return <div>{error}</div>

    return (
        <div className='all_users_container'>
            {users.map((user, index) => (
                <div className='user_card' key={user.id || index}>
                    <div className='user_profile_container'>
                        {user.profileImage ? (
                            <img
                                className='user_profile_image'
                                src={user.profileImage}
                                alt={user.name}
                            />
                        ) : (
                            <img
                                className='user_profile_image'
                                src={DefaultUserProfileImage}
                                alt={user.name}
                            />
                        )}
                    </div>
                    <div className='user_info'>
                        <h3 className='user_name'>{user.name}</h3>
                        <p className='user_email'>{user.email}</p>
                        <p className='user_role'>Role: {user.role}</p>
                        <button
                            className='delete_user_button'
                            onClick={() => handleDeleteUser(user._id)}>
                            <Trash2 size={14} color='red' />
                            <span>Delete User</span>
                        </button>
                    </div>
                </div>
            ))}
            {deleteError && <div className='error_message'>{deleteError}</div>}{' '}
        </div>
    )
}

export default AllUsersComponent
