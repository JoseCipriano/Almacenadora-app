import { useState } from "react";
import { logout as logOutHandler  } from "./userLogOut";

const getUserDetails = () => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
        return JSON.parse(userDetails);
    }else {
        return null
    }
}


export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails());
    const logout = () => {
        logOutHandler();
    };

    return { 
        isLogged: Boolean(userDetails),
        username: userDetails?.username ? userDetails.username : 'Guest',
        logout
    };
}