import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getUserDetails as getUserDetailsRequest } from "../../services";

const initialUserDetails = {
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "",
        
};

export const useProfile = () => {
    const [profileDetails, setProfileDetails] = useState(initialUserDetails);

    const getUserDetails = useCallback(async () => {
        try {
            const response = await getUserDetailsRequest();
            const { usuario } = response.data;

            setProfileDetails({
                id: usuario._id,
                name: usuario.name,
                username: usuario.username,
                email: usuario.email,
                phone: usuario.phone,
                role: usuario.role
            });
        } catch (error) {
            toast.error("Error al obtener los detalles del usuario");
        }  
    }, []);

    return{
        profileDetails,
        getUserDetails
    }

}