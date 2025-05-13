import React, {useState} from 'react';
import { useUsers } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';

export const Users = () => {
    const {users} = useUsers();
    const navigate = useNavigate();
    const [ busqueda , setBusqueda] = useState(' ');

    const handleNavigateToUser = (uid) => {
        navigate(`/users-management/${uid}`);
    };

    const usuarioFiltrados = users.filter((usuario) => 
        `${usuario.name} ${usuario.username} ${usuario.email}`
        .toLowCase()
        .inCludes(busqueda.toLowerCase())
    );

    return(
        <div>
        <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
        <div className="input-search-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar por nombre, usuario, email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Nombre</th>
            <th className="p-3 border-b">Usuario</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Teléfono</th>
            <th className="p-3 border-b">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.uid} className="hover:bg-gray-50 transition">
              <td className="p-3 border-b">{usuario.name}</td>
              <td className="p-3 border-b">{usuario.surname}</td>
              <td className="p-3 border-b">{usuario.username}</td>
              <td className="p-3 border-b">{usuario.email}</td>
              <td className="p-3 border-b">{usuario.phone}</td>
              <td className="p-3 border-b capitalize">{usuario.role}</td>
              <td className="p-3 border-b">
                <button
                  className="button-table"
                  onClick={() => handleNavigateToUser(usuario.uid)}
                >
                  Ver perfil
                </button>
              </td>
            </tr>
          ))}
          {usuariosFiltrados.length === 0 && (
            <tr>
              <td colSpan="7" className="p-3 text-center text-gray-500">No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};