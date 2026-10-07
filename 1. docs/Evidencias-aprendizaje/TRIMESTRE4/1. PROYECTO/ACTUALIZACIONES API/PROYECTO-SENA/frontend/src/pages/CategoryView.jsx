import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryView = ({ categoria, productos }) => {
  const navigate = useNavigate();
  // Estado para manejar los IDs de productos favoritos
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4">{categoria}</h1>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col">
            <div className="card h-100 border-0 shadow-sm position-relative">
              
              {/* Corazón en la esquina superior derecha */}
              <button 
                onClick={() => toggleFavorito(prod.id)}
                className="btn position-absolute top-0 end-0 m-2 border-0"
                style={{ zIndex: 1, fontSize: '1.5rem', color: favoritos.includes(prod.id) ? 'red' : 'gray' }}
              >
                <i className={`bi bi-heart${favoritos.includes(prod.id) ? '-fill' : ''}`}></i>
              </button>

              <div className="p-3 d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
                <img src={prod.image_url} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} alt={prod.name} />
              </div>
              
              <div className="card-body d-flex flex-column text-center">
                <h6 className="fw-bold mb-2">{prod.name}</h6>
                <p className="text-primary fw-bold">$ {new Intl.NumberFormat('es-CO').format(prod.price)}</p>
                <button className="btn btn-outline-dark w-100" onClick={() => navigate(`/producto/${prod.id}`)}>
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;