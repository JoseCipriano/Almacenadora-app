import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbars/Navbar"
import './dashboardPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'


 export function DashboardPage() {

  const navigate = useNavigate();

  const handleNavigateToAuthPage = () => {
    navigate('/auth');
  }
  return (
    <div>
      <Navbar/>
    <div className="dashboard-container">
      
    
      <div className="hero-section">
        
        <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img 
                src="https://almacenadoranuevasegovia.com/cdn/shop/files/Blog_1-1536x864.png?v=1698766315&width=1100" 
                className="d-block w-100" 
                alt="Almacén 1"
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://almsirius.com/wp-content/uploads/2024/05/portada-almacenadora-sirius-articulo-02.jpg" 
                className="d-block w-100" 
                alt="Almacén 2"
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://cms.ar-racking.com/uploads/2024/11/Logistica-de-almacenamiento-1.jpg" 
                className="d-block w-100" 
                alt="Almacén 3"
              />
            </div>
          </div>
        </div>

        
        <div className="hero-content">
          <h1>Bienvenido a TOP Almacen</h1>
          <br />
          <button className="cta-button" onClick={handleNavigateToAuthPage}> 
            <strong>Inicia Sesión</strong>
          </button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 &nbsp;&nbsp; | &nbsp;&nbsp; Almacenadora App &nbsp;&nbsp; | &nbsp;&nbsp; contacto@alamcenadora.com</p>
      </footer>
    </div>
  </div>
  )
}


