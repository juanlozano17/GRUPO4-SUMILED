import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Mapeo de categorías con sus IDs correspondientes de la BD
  const menuItems = [
    { nombre: 'Lámparas decorativas', icono: 'bi-lamp', ruta: '/catalogo/1' },
    { nombre: 'Lámparas para interior', icono: 'bi-house-door', ruta: '/catalogo/2' },
    { nombre: 'Lámparas para exterior', icono: 'bi-sun', ruta: '/catalogo/3' },
    { nombre: 'Bombillos LED', icono: 'bi-lightbulb', ruta: '/catalogo/4' },
    { nombre: 'Iluminación Inteligente', icono: 'bi-cpu', ruta: '/catalogo/5' },
    { nombre: 'Control de Iluminación', icono: 'bi-sliders', ruta: '/catalogo/6' },
    { nombre: 'Cintas LED', icono: 'bi-lightning', ruta: '/catalogo/7' },
    { nombre: 'Ferretería', icono: 'bi-tools', ruta: '/catalogo/8' },
  ];

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-3 border-bottom shadow-sm bg-white" style={{ position: 'sticky', top: 0, zIndex: 1040 }}>
        
        {/* Izquierda: Categorías y Buscador */}
        <div className="d-flex align-items-center gap-3" style={{ flex: 1 }}>
          <button className="btn d-flex align-items-center gap-2" onClick={() => setMenuAbierto(!menuAbierto)}>
            <i className="bi bi-list fs-3"></i> 
          </button>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-dark"></i></span>
            <input type="text" className="form-control border-start-0" placeholder="Buscar..." />
          </div>
        </div>

        {/* Centro: Logo */}
        <div className="text-center" style={{ flex: 1 }}>
          <Link to="/">
            <img src="/logo-pyp.png" style={{ width: '60px', cursor: 'pointer' }} alt="Logo" />
          </Link>
        </div>

        {/* Derecha: Enlaces de navegación */}
        <div className="d-flex gap-3 align-items-center justify-content-end" style={{ flex: 1 }}>
          <Link className="btn btn-link text-decoration-none text-dark p-0" to="/deseos">
            <i className="bi bi-heart text-dark me-1"></i> Lista de deseos
          </Link>
          <Link className="btn btn-link text-decoration-none text-dark p-0" to="/login">
            <i className="bi bi-person-fill"></i> Cuenta
          </Link>
          <Link className="btn btn-link text-decoration-none text-dark p-0" to="/carrito">
            <i className="bi bi-cart3 text-dark"></i> Carrito
          </Link>
        </div>
      </header>

      {/* Menú lateral */}
      {menuAbierto && (
        <div className="position-fixed bg-dark text-white p-4" style={{ width: '280px', zIndex: 1050, height: '100vh', top: '0', left: 0 }}>
          <div className="d-flex flex-column h-100">
            <button className="btn btn-link text-white text-decoration-none align-self-end fs-4" onClick={() => setMenuAbierto(false)}>✕</button>
            <div className="flex-grow-1 mt-3">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.ruta} 
                  className="btn btn-menu-item w-100 text-start text-white" 
                  onClick={() => setMenuAbierto(false)}
                >
                  <i className={`bi ${item.icono} me-3`}></i> {item.nombre}
                </Link>
              ))}
            </div>
            <div className="mt-auto border-top pt-4">
              <Link to="/contacto" className="btn btn-menu-item w-100 text-start text-white" onClick={() => setMenuAbierto(false)}>
                <i className="bi bi-telephone-fill me-3"></i>Contacto
              </Link>
              <Link to="/garantias" className="btn btn-menu-item w-100 text-start text-white" onClick={() => setMenuAbierto(false)}>
                <i className="bi bi-arrow-repeat me-3"></i>Cambios y garantías
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;