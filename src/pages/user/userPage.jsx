import React from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { Users } from "../../components/user/Users";
import './userPage.css'

export const UserPage = () =>{
    return(
        <div>
            <Navbar/>
            <Users/>
        </div>
    )
}
