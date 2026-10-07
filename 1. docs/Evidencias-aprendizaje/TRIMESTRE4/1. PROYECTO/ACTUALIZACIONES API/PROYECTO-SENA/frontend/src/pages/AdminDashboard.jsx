import React from 'react';
import '../App.css'; // Mantenemos los estilos

const AdminDashboard = () => {
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Menú Lateral (Sidebar) */}
      <nav className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4>Ferroeléctricos P&P</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">Inventario</li>
          <li className="nav-item mb-2">Clientes</li>
          <li className="nav-item mb-2">Reportes</li>
        </ul>
      </nav>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-4">
        <h1>Dashboard Administrativo</h1>
        <hr />
        <div className="row">
          {/* Aquí irán las tarjetas o tablas de tu nuevo mockup */}
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <h5>Total Productos</h5>
              <p>150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;