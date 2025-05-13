import logo from '../assets/img/logoalmacenadora.webp';

export const Logo = ({ text }) => {
    return(
        <div className = "auth-form-logo-container">

            <img src={logo}  alt = "Escudo Almacenadora"/>
            <span> {text} </span>
        </div>
    )
}