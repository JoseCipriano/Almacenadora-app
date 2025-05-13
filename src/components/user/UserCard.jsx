import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserView } from '../../shared/hooks/useUserCard';
import { Navbar} from '../navbars/Navbar'

export const UserCard = () => {
    const {uid} = useParams();
    const navigate = useNavigate();

    const {userDetails, isFetching, getUserById} = useUserView();

    useEffect(() => {
        if (uid) getUserById(uid);
    }, [uid]);

    if (isFetching) return <p className='loading'> Espera un momento....</p>;

    return (
        <>
        <Navbar/>
        <div className="user-card-container">
        <div className="user-card-header">
          <div className="user-avatar">
            {userDetails.name?.charAt(0)}
          </div>
          <div className="user-info">
            <h2>Perfil del Usuario</h2>
            <p>{userDetails.email}</p>
          </div>
        </div>

        <div className="user-details">
          <p><strong>Nombre:</strong> {userDetails.name}</p>
          <p><strong>Apellido:</strong> {userDetails.surname}</p>
          <p><strong>Usuario:</strong> {userDetails.username}</p>
          <p><strong>Teléfono:</strong> {userDetails.phone}</p>
          <p><strong>Rol: </strong> {userDetails.rol}</p>

        </div>
        <div className="user-actions">
            <button
              className="update-role"
              onClick={() => setEditandoRol(true)}
            >
              Actualizar Rol
            </button>
            <button
              className="delete-user"
              onClick={() => setMostrarModal(true)}
            >
              Eliminar Usuario
            </button>
            <button
              onClick={() => navigate('/users-management')}
              className="back-button"
            >
              ← Regresar
            </button>
         </div>
      </div>
     </>
     );
};
