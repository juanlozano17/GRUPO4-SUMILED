import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5000/productos';
const USERS_URL = 'http://localhost:5000/usuarios';

function App() {
  // ESTADOS DE SESIÓN
  const [isLogged, setIsLogged] = useState(() => localStorage.getItem('isLogged') === 'true');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'cliente');
  
  // ESTADOS DE DATOS
  const [productos, setProductos] = useState([]);
  const [userLogin, setUserLogin] = useState({ email: '', password: '' });
  const [editId, setEditId] = useState(null); // Para saber si estamos editando
  
  const [nuevoUsuario, setNuevoUsuario] = useState({ 
    nombre: '', apellidos: '', user: '', ciudad: '', pass: '', telefono: '', rol: 'cliente' 
  });

  const [nuevoProd, setNuevoProd] = useState({ nombre: '', categoria: '', precio: '', stock: '' });

  useEffect(() => {
    if (isLogged && userRole === 'admin') {
      fetchProductos();
    }
  }, [isLogged, userRole]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) { console.error("Error cargando productos"); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(USERS_URL);
      const listaActualizada = res.data;

      const usuarioValido = listaActualizada.find((u) => {
        const emailMatch = u.user.trim().toLowerCase() === userLogin.email.trim().toLowerCase();
        const passMatch = u.pass === userLogin.password || u.pass === btoa(userLogin.password);
        return emailMatch && passMatch;
      });

      if (usuarioValido || (userLogin.email === 'admin1' && userLogin.password === '445587')) {
  const rol = usuarioValido ? usuarioValido.rol : 'admin';
  const token = usuarioValido ? btoa(usuarioValido.id + ':' + usuarioValido.user) : btoa('admin1:admin1');
  localStorage.setItem('isLogged', 'true');
  localStorage.setItem('userRole', rol);
  localStorage.setItem('token', token);
  setIsLogged(true);
  setUserRole(rol);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) { alert("Error al conectar con el servidor"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    setUserRole('cliente');
    setProductos([]);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const esAdmin = nuevoUsuario.user.toLowerCase().includes('@pyp.com');
      const rolAsignado = esAdmin ? 'admin' : 'cliente';
      const datosFinales = { 
        ...nuevoUsuario, 
        id: Math.random().toString(36).substr(2, 9), 
        rol: rolAsignado,
        pass: btoa(nuevoUsuario.pass)
      };
      await axios.post(USERS_URL, datosFinales);
      alert(`Cuenta ${rolAsignado.toUpperCase()} creada con éxito`);
      setNuevoUsuario({ nombre: '', apellidos: '', user: '', ciudad: '', pass: '', telefono: '', rol: 'cliente' });
      document.querySelector('#modalRegistro [data-bs-dismiss="modal"]')?.click();
    } catch (error) { alert("Error al registrar"); }
  };

  // FUNCION PARA GUARDAR (CREAR O EDITAR)
  const handleGuardarDefinitivo = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        nombre: nuevoProd.nombre, 
        categoria: nuevoProd.categoria, 
        precio: Number(nuevoProd.precio), 
        stock: Number(nuevoProd.stock) 
      };
      
      if (editId) {
        // ACTUALIZAR (PUT)
        await axios.put(`${API_URL}/${editId}`, { ...data, id: editId });
        alert("¡Producto actualizado correctamente!");
      } else {
        // CREAR (POST) con ID Aleatoria
        const idAleatoria = Math.random().toString(36).substr(2, 9);
        await axios.post(API_URL, { ...data, id: idAleatoria });
        alert("¡Producto agregado al inventario!");
      }

      setEditId(null);
      setNuevoProd({ nombre: '', categoria: '', precio: '', stock: '' });
      fetchProductos();
      document.querySelector('#modalProducto [data-bs-dismiss="modal"]')?.click();
    } catch (err) { alert("Error en la operación de inventario"); }
  };

  // CARGAR DATOS EN EL MODAL PARA EDITAR
  const prepararEdicion = (p) => {
    setEditId(p.id);
    setNuevoProd({ nombre: p.nombre, categoria: p.categoria, precio: p.precio, stock: p.stock });
  };

  // BORRAR PRODUCTO
  const handleBorrar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Producto eliminado del sistema");
        fetchProductos();
      } catch (error) { alert("Error al eliminar"); }
    }
  };

  if (!isLogged) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 p-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card shadow-lg border-0 d-flex flex-row overflow-hidden" style={{ maxWidth: '1000px', borderRadius: '40px', width: '100%', minHeight: '600px' }}>
          <div className="p-5 bg-white d-flex flex-column justify-content-center" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="text-center mb-5">
              <img src="/logo-pyp.png" alt="Logo" style={{ width: '90px' }} />
              <h2 className="fw-bold mt-4 text-dark">Ferroeléctricos P&P</h2>
              <p className="text-muted">Inicia sesión para gestionar el sistema</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="small fw-bold text-muted mb-1 ms-2">CORREO ELECTRÓNICO</label>
                <input type="text" className="form-control py-3 rounded-4 border-light shadow-sm" style={{ backgroundColor: '#f1f3f5' }} required onChange={(e)=>setUserLogin({...userLogin, email:e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="small fw-bold text-muted mb-1 ms-2">CONTRASEÑA</label>
                <input type="password" placeholder="••••••••" className="form-control py-3 rounded-4 border-light shadow-sm" style={{ backgroundColor: '#f1f3f5' }} required onChange={(e)=>setUserLogin({...userLogin, password:e.target.value})} />
              </div>
              <button className="btn btn-dark w-100 py-3 rounded-4 fw-bold shadow-sm">Ingresar</button>
            </form>
            <div className="text-center mt-4">
              <button className="btn btn-link text-dark fw-bold text-decoration-none small" data-bs-toggle="modal" data-bs-target="#modalRegistro">¿No tienes cuenta? Regístrate</button>
            </div>
          </div>
          <div className="d-none d-md-block" style={{ width: '50%', backgroundImage: 'url("/tienda-pyp.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        {/* MODAL REGISTRO */}
        <div className="modal fade" id="modalRegistro" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 rounded-5 border-0 shadow">
              <h4 className="fw-bold text-center mb-4">Crear Nueva Cuenta</h4>
              <form onSubmit={handleRegistro}>
                <div className="row g-2">
                  <div className="col-6 mb-2"><input type="text" placeholder="Nombre" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, nombre:e.target.value})} /></div>
                  <div className="col-6 mb-2"><input type="text" placeholder="Apellidos" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, apellidos:e.target.value})} /></div>
                  <div className="col-12 mb-2"><input type="email" placeholder="Correo electrónico" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, user:e.target.value})} /></div>
                  <div className="col-6 mb-2"><input type="text" placeholder="Ciudad" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, ciudad:e.target.value})} /></div>
                  <div className="col-6 mb-2"><input type="text" placeholder="Teléfono" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, telefono:e.target.value})} /></div>
                  <div className="col-12 mb-2"><input type="password" placeholder="Contraseña" className="form-control" required onChange={(e)=>setNuevoUsuario({...nuevoUsuario, pass:e.target.value})} /></div>
                </div>
                <button className="btn btn-primary w-100 mt-4 py-2 rounded-pill fw-bold shadow">Crear cuenta</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
        <span className="navbar-brand fw-bold">P&P - {userRole.toUpperCase()}</span>
        <button className="btn btn-outline-danger btn-sm rounded-pill px-4" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>

      <div className="container mt-5 pb-5">
        {userRole === 'admin' ? (
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Gestión de Inventario</h3>
              <button className="btn btn-success fw-bold rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={() => { setEditId(null); setNuevoProd({ nombre: '', categoria: '', precio: '', stock: '' }); }}>+ Nuevo Producto</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr><th>ID</th><th>NOMBRE</th><th>CATEGORÍA</th><th>PRECIO</th><th>STOCK</th><th>ACCIONES</th></tr>
                </thead>
                <tbody>
                  {productos.map(p => (
                    <tr key={p.id}>
                      <td className="text-muted small">#{p.id}</td>
                      <td className="fw-bold">{p.nombre}</td>
                      <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                      <td className="text-success fw-bold">${Number(p.precio).toLocaleString()}</td>
                      <td><span className={`badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}`}>{p.stock} un.</span></td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={() => prepararEdicion(p)}>✏️</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleBorrar(p.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-5 shadow-sm mt-5">
            <h1 className="display-5 fw-bold text-dark">Bienvenido, {userRole}</h1>
            <p className="fs-5 text-muted">Módulo de cliente activo. Catálogo en construcción.</p>
          </div>
        )}
      </div>

      {/* MODAL PRODUCTO (para Crear y Editar) */}
      <div className="modal fade" id="modalProducto" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-5 border-0 shadow">
            <h4 className="fw-bold mb-3">{editId ? 'Editar Producto' : 'Nuevo Producto'}</h4>
            <form onSubmit={handleGuardarDefinitivo}>
              <input type="text" placeholder="Nombre" className="form-control mb-2" required value={nuevoProd.nombre} onChange={(e)=>setNuevoProd({...nuevoProd, nombre:e.target.value})} />
              <input type="text" placeholder="Categoría" className="form-control mb-2" required value={nuevoProd.categoria} onChange={(e)=>setNuevoProd({...nuevoProd, categoria:e.target.value})} />
              <input type="number" placeholder="Precio" className="form-control mb-2" required value={nuevoProd.precio} onChange={(e)=>setNuevoProd({...nuevoProd, precio:e.target.value})} />
              <input type="number" placeholder="Stock" className="form-control mb-3" required value={nuevoProd.stock} onChange={(e)=>setNuevoProd({...nuevoProd, stock:e.target.value})} />
              <button className="btn btn-dark w-100 py-2 rounded-pill fw-bold">
                {editId ? 'Actualizar Cambios' : 'Guardar en Inventario'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;