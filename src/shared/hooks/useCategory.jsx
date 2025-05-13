import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  getCategorys } from '../../services';
import toast from "react-hot-toast";

export const useCategory = () => {
    
    const [ categoryDetails, setCategoryDetails ] = useState();

    const getCategoryDetails = async () => {
        const responseData = await getCategorys()

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error al cargar la informaciion de las categorias'
            )
        }

        setCategoryDetails(responseData)
    }

    return{
        categoryDetails,
        isFetching: !categoryDetails,
        getCategoryDetails,
    }
}

