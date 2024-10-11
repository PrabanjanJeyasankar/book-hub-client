import React, { useEffect, useState } from 'react'
import fetchAllUsersService from '../../../services/fetchAllUsersService'
import './AllUsersComponent.css'

const AllUsersComponent = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='all_users_container'>
            {users.map((user) => (
                <div className='user_card' key={user.id}>
                    <div className='user_profile_container'>
                        <img
                            className='user_profile_image'
                            src={user.profileImage}
                            alt=''
                        />
                    </div>
                    <div className='user_info'>
                        <h3 className='user_name'>{user.name}</h3>
                        <p className='user_email'>{user.email}</p>
                        <p className='user_role'>Role: {user.role}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllUsersComponent
