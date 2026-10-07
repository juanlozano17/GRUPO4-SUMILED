import React from 'react';
import '../App.css'; 

const ClientCatalog = ({ cambiarVista, verDetalles }) => {
  // Array con los datos de las categorías
  const categorias = [
    { nombre: 'Cintas LED', cant: '19', img: '/cintasled.png' },
    { nombre: 'Lámparas colgantes', cant: '30', img: '/colgante.png' },
    { nombre: 'Lámparas de techo', cant: '29', img: '/lamparastecho.png' },
    { nombre: 'Lámparas T5', cant: '17', img: '/t5.png' },
    { nombre: 'Paneles LED', cant: '33', img: '/paneles.png' }
  ];

  return (
    <div className="container-fluid p-0">
      {/* 1. Navbar centralizado */}

      {/* 2. Banner Principal */}
      <section className="container-fluid px-5 my-5">   
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold">Lámparas colgantes</h1>
            <p className="lead">Descubre las elegantes Lámparas colgantes perfectas para tu hogar, estas lámparas colgantes decorativas de metal negro añade un toque de sofisticación.</p>
            
            {/* Botón con el evento configurado */}
            <button 
              className="btn btn-dark btn-lg mt-3" 
              onClick={() => verDetalles('albaraccin-lamp')}
            >
              Detalles de este producto
            </button>
            <div className="mt-4"><span className="border p-2 rounded">30 productos disponibles</span></div>
          </div>
          <div className="col-md-6 text-center">
            <img src="/lamparas.jpg" className="img-fluid rounded" style={{ maxWidth: '400px' }} alt="Lámpara" />
          </div>
        </div>
      </section>

      {/* 3. Categorías generadas dinámicamente */}
      <section className="bg-light p-5 text-center">
        <h3 className="mb-5">Categorías importantes</h3>
        <div className="container">
          <div className="row justify-content-center g-4">
            {categorias.map((cat, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <div className="card p-3 border-0 shadow-sm h-100 align-items-center">
                  <img src={cat.img} alt={cat.nombre} className="img-fluid mb-2" style={{ height: '80px', objectFit: 'contain' }} />
                  <p className="fw-bold mb-0">{cat.nombre}</p>
                  <small className="text-muted">{cat.cant} productos</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container my-5 py-4 border-top">
        <div className="row text-center">
          <div className="col-md-3 mb-3">
            <i className="bi bi-truck fs-2"></i>
            <p className="fw-bold mb-0">Envíos a toda Colombia</p>
            <small className="text-muted">Por compras superiores a 600.000</small>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-shield-check fs-2"></i>
            <p className="fw-bold mb-0">Garantía de fábrica</p>
            <small className="text-muted">Garantía en todos los productos por 5 años</small>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-credit-card fs-2"></i>
            <p className="fw-bold mb-0">Pagos 100% seguros</p>
            <small className="text-muted">Muchos métodos de pago</small>
          </div>
          <div className="col-md-3 mb-3">
            <i className="bi bi-headset fs-2"></i>
            <p className="fw-bold mb-0">Asesoría virtual gratuita</p>
            <small className="text-muted">Cuéntanos tus dudas</small>
          </div>
        </div>
      </section>      
      
      {/* 5. Sección Productos Destacados */}
      <section className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Productos destacados</h2>
        <div className="row g-4">
          {[
            { nombre: 'Cinta Led 12V 48W 120 Leds/m de 5 Metros x 5mm', precio: '$ 33.500', img: '/cintaled5m.png' },
            { nombre: 'Spot Led PAR38 Negro para Riel (Sin Bombillo)', precio: '$ 55.300', img: '/spotled.png' },
            { nombre: 'Lámpara Lineal LED 17W de Sobreponer Blanca', precio: '$ 255.400', img: '/ledlienal.png' },
            { nombre: 'Toma Corriente Doble de Incrustar', precio: '$ 7.500', img: '/tomacorriente.png' }
          ].map((prod, index) => (
            <div key={index} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm p-3 text-center">
                <img src={prod.img} className="card-img-top img-fluid mb-3" style={{ height: '150px', objectFit: 'contain' }} alt={prod.nombre} />
                <div className="card-body p-0">
                  <p className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{prod.nombre}</p>
                  <p className="text-muted fw-bold mb-3">{prod.precio}</p>
                  <button className="btn btn-info btn-sm text-white w-100">
                    <i className="bi bi-cart-fill me-2"></i>Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Sectores que atendemos</h2>
        <div className="row g-4">
          {[
            { titulo: 'Iluminación para bodegas', img: '/bodega1.png' }, // Cambia por tus imágenes reales
            { titulo: 'Iluminación para oficinas', img: '/oficinailuminada.png' },
            { titulo: 'Iluminación para tiendas', img: '/tiendailuminada.png' },
            { titulo: 'Iluminación para hogar', img: '/hogariluminado.png' }
          ].map((sector, index) => (
            <div key={index} className="col-md-3">
              <div className="position-relative overflow-hidden rounded" style={{ height: '350px' }}>
                <img 
                  src={sector.img} 
                  alt={sector.titulo} 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }} 
                />
                {/* Etiqueta negra abajo */}
                <div className="position-absolute bottom-0 w-100 bg-dark text-white text-center py-2">
                  <small className="fw-bold">{sector.titulo}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientCatalog;