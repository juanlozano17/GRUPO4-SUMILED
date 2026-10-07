import { supabase } from './supabaseClient';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import ClientCatalog from './pages/ClientCatalog';
import ProductDetail from './pages/ProductDetail'; 
import CatalogoContainer from './pages/CatalogoContainer';
import Contact from './pages/Contact';
import Garantias from './pages/Garantias';

function App() {
  return (
    <BrowserRouter>
      {/* El Navbar ahora estará presente en todas las rutas */}
      <Navbar /> 

      <Routes>
        {/* Catálogo Principal */}
        <Route path="/" element={<ClientCatalog />} />
        
        {/* Catálogo por categoría (Ruta dinámica) */}
        <Route path="/catalogo/:idCategoria" element={<CatalogoContainer />} />

        {/* Detalle de producto */}
        <Route path="/producto/:id" element={<ProductDetail />} />
        
        {/* Detalle de producto (Ruta dinámica) */}
        <Route path="/producto/:id" element={<ProductDetail />} />
        
        {/* Otras vistas */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/garantias" element={<Garantias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;