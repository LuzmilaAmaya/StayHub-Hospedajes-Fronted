import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdmin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
      title: "Suite Presidencial",
      description: "Lujo y confort en cada detalle"
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop",
      title: "Habitación Deluxe",
      description: "Espacios amplios con vistas espectaculares"
    },
    {
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=600&fit=crop",
      title: "Lobby Principal",
      description: "Bienvenido a la elegancia"
    },
    {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=600&fit=crop",
      title: "Habitación Estándar",
      description: "Comodidad a precio accesible"
    }
  ];

  const featuredRooms = [
    {
      id: 1,
      name: "Suite Ejecutiva",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      price: "$150",
      rating: 4.8,
      amenities: ["WiFi", "TV", "Desayuno"]
    },
    {
      id: 2,
      name: "Habitación Familiar",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      price: "$120",
      rating: 4.6,
      amenities: ["WiFi", "TV", "Cuna gratis"]
    },
    {
      id: 3,
      name: "Habitación Doble Premium",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop",
      price: "$95",
      rating: 4.7,
      amenities: ["WiFi", "TV", "Minibar"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet"
      />
      
      <style>{`
        :root {
          --primary-red: #B4280D;
          --beige-light: #E9EBEA;
          --beige-dark: #B19E8D;
          --gray-footer: #8B7F7F;
        }
        
        body {
          background-color: var(--beige-light);
        }
        
        .btn-primary-custom {
          background-color: var(--primary-red);
          border-color: var(--primary-red);
          color: white;
        }
        
        .btn-primary-custom:hover {
          background-color: #8B1F0A;
          border-color: #8B1F0A;
          color: white;
        }
        
        .btn-outline-custom {
          border: 2px solid var(--primary-red);
          color: var(--primary-red);
          background-color: white;
        }
        
        .btn-outline-custom:hover {
          background-color: var(--beige-light);
          border-color: var(--primary-red);
          color: var(--primary-red);
        }
        
        .text-primary-custom {
          color: var(--primary-red);
        }
        
        .bg-primary-custom {
          background-color: var(--primary-red);
        }
        
        .logo-box {
          width: 40px;
          height: 40px;
          background-color: var(--primary-red);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-item {
          height: 400px;
        }
        
        .carousel-item img {
          object-fit: cover;
          height: 100%;
        }
        
        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .room-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .room-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .room-card img {
          height: 200px;
          object-fit: cover;
        }
        
        .feature-icon {
          width: 64px;
          height: 64px;
          background-color: var(--beige-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        
        .feature-icon i {
          font-size: 2rem;
          color: var(--primary-red);
        }
        
        .badge-custom {
          background-color: var(--beige-light);
          color: #333;
        }
        
        .custom-shape-divider-bottom-1769207801 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }
        
        .custom-shape-divider-bottom-1769207801 svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 150px;
        }
        
        .custom-shape-divider-bottom-1769207801 .shape-fill {
          fill: #FFFFFF;
        }
        
        .hero-section {
          position: relative;
          background-image: url('https://cdn.discordapp.com/attachments/1464358594529988659/1464387549194747947/ChatGPT_Image_23_ene_2026_07_31_51_p.m..png?ex=697548ae&is=6973f72e&hm=9953745c63ec4c791d87d7c05a1c2ebde062efbf6cb84add09421b39f56321ed&');
          background-size: cover;
          background-position: center;
          padding-bottom: 250px;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-section h1,
        .hero-section p {
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .carousel-item {
            height: 250px;
          }
        }
      `}</style>

      <div style={{ backgroundColor: '#E9EBEA', minHeight: '100vh' }}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <div className="logo-box me-2">
                <svg viewBox="0 0 100 100" width="24" height="24">
                  <rect x="20" y="50" width="25" height="30" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="55" y="30" width="25" height="50" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="30" y="35" width="15" height="15" fill="none" stroke="white" strokeWidth="3"/>
                  <rect x="60" y="40" width="10" height="10" fill="none" stroke="white" strokeWidth="3"/>
                  <line x1="20" y1="80" x2="45" y2="80" stroke="white" strokeWidth="4"/>
                  <line x1="55" y1="80" x2="80" y2="80" stroke="white" strokeWidth="4"/>
                </svg>
              </div>
              <span className="fw-bold fs-4">STAYHUB</span>
            </a>
            
            <div className="d-none d-lg-flex ms-4">
              <a href="/habitaciones" className="btn btn-primary-custom me-2">
                <i className="bi bi-door-open me-2"></i>
                Explorar Habitaciones
              </a>
              {isAdmin && (
                <Link to="/reservas" className="btn btn-outline-custom">
                  <i className="bi bi-calendar-check me-2"></i>
                  Ver Reservas
                </Link>
              )}
            </div>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-controls="navbarNav" 
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-lg-center">
                <li className="nav-item d-lg-none my-2">
                  <a href="/habitaciones" className="btn btn-primary-custom w-100">
                    <i className="bi bi-door-open me-2"></i>
                    Explorar Habitaciones
                  </a>
                </li>
                {isAdmin && (
                  <li className="nav-item d-lg-none my-2">
                    <Link to="/reservas" className="btn btn-outline-custom w-100">
                      <i className="bi bi-calendar-check me-2"></i>
                      Ver Reservas
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/habitaciones">Habitaciones</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contacto">Contacto</a>
                </li>
                <li className="nav-item ms-lg-3 my-2 my-lg-0">
                  <a href="/login" className="btn btn-outline-custom me-2">
                    Iniciar Sesión
                  </a>
                </li>
                <li className="nav-item my-2 my-lg-0">
                  <a href="/registro" className="btn btn-primary-custom">
                    Registrarse
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container py-5 hero-content">
            <div className="text-center mb-4">
              <h1 className="display-3 fw-bold mb-3">
                Bienvenido a <span style={{ color: '#FFFFFF' }}>StayHub</span>
              </h1>
              <p className="lead mb-4">
                Descubre la comodidad y el lujo en cada estadía. Reserva tu habitación perfecta con nosotros.
              </p>
            </div>
          </div>
          <div className="custom-shape-divider-bottom-1769207801">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
            </svg>
          </div>
        </div>

        {/* Carousel */}
        <div id="carouselHero" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselHero"
                data-bs-slide-to={index}
                className={index === currentSlide ? "active" : ""}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {carouselImages.map((slide, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? "active" : ""}`}>
                <img src={slide.url} className="d-block w-100" alt={slide.title} />
                <div className="carousel-overlay">
                  <div className="text-center">
                    <h2 className="display-5 fw-bold mb-2">{slide.title}</h2>
                    <p className="fs-5">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" onClick={prevSlide}>
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" onClick={nextSlide}>
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* Featured Rooms */}
        <div className="container py-5">
          <div className="mt-5">
            <h2 className="display-5 fw-bold text-center mb-3">Habitaciones Destacadas</h2>
            <p className="text-center text-muted mb-5 fs-5">
              Nuestras opciones más populares para tu próxima estadía
            </p>
            
            <div className="row g-4">
              {featuredRooms.map((room) => (
                <div key={room.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card room-card h-100 border-0 shadow">
                    <div className="position-relative">
                      <img src={room.image} className="card-img-top" alt={room.name} />
                      <span className="position-absolute top-0 end-0 m-3 badge bg-primary-custom fs-6">
                        {room.price}/noche
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{room.name}</h5>
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="ms-1 fw-semibold">{room.rating}</span>
                        <span className="ms-1 text-muted small">(250+ reseñas)</span>
                      </div>
                      <div className="mb-3">
                        {room.amenities.map((amenity, idx) => (
                          <span key={idx} className="badge badge-custom me-2 mb-2">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <a href="/reservar" className="btn btn-primary-custom w-100">
                        Reservar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="row g-4 mt-5">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-door-open"></i>
                </div>
                <h5 className="fw-bold mb-2">Habitaciones Premium</h5>
                <p className="text-muted">Amplias habitaciones con todas las comodidades que necesitas</p>
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h5 className="fw-bold mb-2">Reserva Fácil</h5>
                <p className="text-muted">Sistema de reservas sencillo y rápido en pocos clicks</p>
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-headset"></i>
                </div>
                <h5 className="fw-bold mb-2">Soporte 24/7</h5>
                <p className="text-muted">Estamos disponibles en todo momento para ayudarte</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-white py-4 mt-5" style={{ backgroundColor: '#8B7F7F' }}>
          <div className="container text-center">
            <p className="mb-0">© 2026 StayHub. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}