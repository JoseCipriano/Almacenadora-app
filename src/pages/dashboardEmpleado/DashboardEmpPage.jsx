import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbars/Navbar"

export function DashboardPageEmpleado(){

    const  navigate = useNavigate();

    return(
        <div>
        <Navbar/>
        <h1>EMPLEADO DASHBOARS</h1>
        </div>
    )
















}