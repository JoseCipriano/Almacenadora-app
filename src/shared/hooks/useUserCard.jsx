import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getUserById as getUserByIdRequest } from "../../services";

const initialUserDetails = {
    _id: "",
    nombre: "",
    apellido: "",
    correo: "",
    rol: "",
    telefono: "",
    direccion: "",
    activo: false

};

export const useUserView = () => {
    const [userDetails, setUserDetails] =  useState(initialUserDetails);

    const getUserById = useCallback(async (id) => {
        try {
            const response = await getUserByIdRequest(id);

            if(response.error){
                return toast.error(
                    response.e?.response?.data || "Error al obtener la informacion del usuario"
                );
            }
            setUserDetails(response.data.user)
            
        } catch (error) {
            toast.error(error.message || "Error al obtener las informacion del usuario");
        }
    }, []);

    return{
        userDetails,
        isFetching: userDetails._id === "",
        getUserById
        };
};