import React from 'react';
import { Navbar } from '../../components/navbars/Navbar';
import { Profile } from '../../components/profile/Profile';
import './profilePage.css';

export const ProfilePage = () => {
    //const rol = localStorage.getItem('role');

    return(
    <div>
        <div className='profile-page-container'>
        <h1 className='profile-page-title'>Perfil de Usuario</h1>
        <Profile />
        </div>
    </div>
    );
};