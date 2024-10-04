import React, { useContext } from 'react'
import './UserProfileComponent.css'
import { UserContext } from '../../context/UserContext/UserContext'
import DummyProfileImage from '../../assets/img/img2.png'

function UserProfileComponent() {
    const { userProfile } = useContext(UserContext)
    if (!userProfile) {
        return <div>Loading...</div>
    }

    return (
        <div className='profile-container'>
            <div className='profile-header'>
                <div className='profile-image-container'>
                    <img
                        src={DummyProfileImage}
                        alt='Profile'
                        className='profile-image'
                    />
                    <div className='status-indicator'></div>
                </div>
                <div className='profile-info'>
                    <h1 className='profile-name'>
                        {userProfile && userProfile.name}
                    </h1>
                    <p className='profile-location'>
                        {userProfile && userProfile.email}
                    </p>
                </div>
                <div className='profile-actions'>
                    <button className='edit-profile-btn'>Edit Profile</button>
                    {/* <button className='more-options-btn'>•••</button> */}
                </div>
            </div>
            {/* <div className='profile-badges'>
                <span className='badge'>PRO ACCOUNT</span>
            </div> */}
            <nav className='profile-nav'>
                <ul>
                    <li className='active'>
                        <a href='#work'>Liked Books</a>
                    </li>
                    <li>
                        <a href='#boosted'>Collections</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default UserProfileComponent
