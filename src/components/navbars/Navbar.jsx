import { Route, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logoalmacenadora.webp";
import { useUserDetails } from "../../shared/hooks";

const NavLogo = () => {
    return (
        <div className="nav-logo-container"> 
        <img 
            className="nav-logo"
            width='100%'
            height='100%'
            src={logo}
            alt = "Logo Almaceadora"
        />
        </div>
    )

}

const NavButton = ({text, onClickHandler}) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {text}
        </span>
    )

}

export const Navbar = () => {

    const {isLogged, logout} = useUserDetails()

    const navigate = useNavigate()

    const handleNavigateToAuthPage = () => {
        navigate('/auth');

    }

    const handleNavigateToMyProfile = () => { 
        navigate('/profile');
    }

    const handleNavigateToProductsPage = () => {
        navigate('/products');
    }
    
    const handleNavigateToCategoryPage = () => {
       navigate('/category');
    }

    const handleLogout = () => {  
        logout();
     
    }

    return (
        <div className="nav-container">
            <NavLogo/>
            <div className="nav-buttons-container">
                <NavButton text = "Almacenadora App" />
                {!isLogged ? (
                    <NavButton text = "Login" onClickHandler={handleNavigateToAuthPage}/>
                ):(
                    <div>
                        <NavButton text = "My Account" onClickHandler={handleNavigateToMyProfile}/>
                        <NavButton text = "Logout" onClickHandler={handleLogout}/>
                        <NavButton text = "Category" onClickHandler={handleNavigateToCategoryPage}/>
                        <NavButton text = "Products" onClickHandler={handleNavigateToProductsPage}/>
                        
                    </div>
                )}
                
            </div>

        </div>
    )
}