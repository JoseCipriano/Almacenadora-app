import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../shared/hooks";
import { useUserDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

const LogoutButton = ({ onLogout }) => (
    <button className='logout-button' onClick={onLogout}>
        Cerrar sesión
    </button>
);

export const Profile = () => {
    const navigate = useNavigate();
    const {profileDetails, getUserDetails} = useProfile();
    const {user , logout } = useUserDetails();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
    });

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    useEffect(() => {
        if(profileDetails){
            setFormData({
                name: profileDetails.name || '',
                username: profileDetails.username || '',
                phone: profileDetails.phone || '',
          });
        }
    }, [profileDetails]);

    const handleLogout = () => {
        logout();
        toast.success('Sesión cerrada correctamente');
        navigate('/');
    };

    const isOwner = user?.id === profileDetails.id;

    return(
        <div className='profile-container'>
            <div className='profile-header'>
                <div className='profile-avatar'>
                    <div className='avatar-placeholder'>
                        {profileDetails.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>
                <h2>{profileDetails.username}</h2>
            </div>

            <div className='profile-info'>
                    <p><strong>Nombres:</strong> {profileDetails.name}</p>
                    <p><strong>Apellidos:</strong> {profileDetails.surname}</p>
                    <p><strong>Email:</strong> {profileDetails.email}</p>
                    <p><strong>Teléfono:</strong> {profileDetails.phone}</p>
                    <p><strong>Rol:</strong> {profileDetails.role}</p>
            </div>
            {isOwner && (
                <div className='profile-buttons-container-user'>
                    <LogoutButton onLogout={handleLogout} />
                </div>
            )}
        </div>
     );
};