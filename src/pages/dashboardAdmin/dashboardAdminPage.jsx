import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbars/Navbar"

export function DashboardPageAdmin(){

    const  navigate = useNavigate();

    return(
        <div className="homepage">
      <Navbar />

      <header className="hero">
        <h1>Panel de Administración</h1>
        <p>Control total de tu almacenadora desde un solo lugar</p>
      </header>

      <section className="stats">
        <div className="stat-box">
          <h2>+50</h2>
          <p>Proveedores Registrados</p>
        </div>
        <div className="stat-box">
          <h2>+300</h2>
          <p>Movimientos Recientes</p>
        </div>
        <div className="stat-box">
          <h2>99%</h2>
          <p>Inventario Preciso</p>
        </div>
      </section>

    

      <footer className="footer">
        <p>© 2025&nbsp;&nbsp; | &nbsp;&nbsp; Almacenadora App &nbsp;&nbsp; | &nbsp;&nbsp; contacto@almacenadora.com</p>
      </footer>
    </div>
    )


}