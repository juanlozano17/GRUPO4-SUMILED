
CREATE TABLE public.roles (
    id_rol   SERIAL PRIMARY KEY,
    nombre   VARCHAR(45) 
);

CREATE TABLE public.medio_de_pago (
    idmedio_pago SERIAL PRIMARY KEY,
    nombre       VARCHAR(100) ,
    tipo_med     VARCHAR(30)
);

CREATE TABLE public.transportadora (
    idtransportadora      SERIAL PRIMARY KEY,
    telefono              VARCHAR(15),
    nombre_transportadora VARCHAR(50) ,
    pagina_web            VARCHAR(30)
);

CREATE TABLE public.categorias (
    idcategoria SERIAL PRIMARY KEY,
    nombre      VARCHAR(45) 
);

CREATE TABLE public.proveedores (
    idproveedor      SERIAL PRIMARY KEY,
    nombre_proveedor VARCHAR(45) ,
    contacto         VARCHAR(45),
    correo           VARCHAR(100) UNIQUE,
    telefono         VARCHAR(15)
);

CREATE TABLE public.usuarios (
    idusuario          SERIAL PRIMARY KEY,
    id_rol             INT ,
    nombre             VARCHAR(100) ,
    correo             VARCHAR(100) UNIQUE NOT NULL,
    contrasena         VARCHAR(255) NOT NULL,
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol)
);

CREATE TABLE public.cliente (
    idcliente          SERIAL PRIMARY KEY,
    idusuario          INT,
    direccion          VARCHAR(225),
    nombre             VARCHAR(45) NOT NULL,
    apellido           VARCHAR(45) NOT NULL,
    telefono           VARCHAR(15),
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    CONSTRAINT fk_usuario_cliente FOREIGN KEY (idusuario) REFERENCES public.usuarios(idusuario)
);

CREATE TABLE public.producto (
    idproducto         SERIAL PRIMARY KEY,
    idcategoria        INT,
    nombre_producto    VARCHAR(100) NOT NULL,
    precio             NUMERIC(10,2) NOT NULL,
    descripcion        TEXT,
    caracteristicas    TEXT,
    imagenes           VARCHAR(225),
    estado             VARCHAR(20) DEFAULT 'activo',
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    CONSTRAINT fk_categoria_producto FOREIGN KEY (idcategoria) REFERENCES public.categorias(idcategoria)
);

CREATE TABLE public.producto_proveedor (
    idproducto           INT,
    idproveedor          INT,
    precio_compra_actual NUMERIC(10,2),
    PRIMARY KEY (idproducto, idproveedor),
    CONSTRAINT fk_producto_proveedor FOREIGN KEY (idproducto)  REFERENCES public.producto(idproducto),
    CONSTRAINT fk_proveedor_producto FOREIGN KEY (idproveedor) REFERENCES public.proveedores(idproveedor)
);

CREATE TABLE public.venta (
    idventa            SERIAL PRIMARY KEY,
    idmedio_pago       INT,
    idcliente          INT,
    fecha_pedido       DATE DEFAULT CURRENT_DATE,
    total              NUMERIC(14,2) NOT NULL,
    estado             VARCHAR(20) DEFAULT 'pendiente',
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    CONSTRAINT fk_mediopago_venta FOREIGN KEY (idmedio_pago) REFERENCES public.medio_de_pago(idmedio_pago),
    CONSTRAINT fk_cliente_venta   FOREIGN KEY (idcliente)    REFERENCES public.cliente(idcliente)
);

CREATE TABLE public.detalle_venta (
    idventa         INT,
    idproducto      INT,
    cantidad        INT NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL,
    PRIMARY KEY (idventa, idproducto),
    CONSTRAINT fk_venta_detalle    FOREIGN KEY (idventa)    REFERENCES public.venta(idventa),
    CONSTRAINT fk_producto_detalle FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto)
);

CREATE TABLE public.registro_envio (
    idenvio          SERIAL PRIMARY KEY,
    idtransportadora INT,
    numero_guia      VARCHAR(50),
    fecha_envio      DATE,
    estado           VARCHAR(20) DEFAULT 'en_camino',
    idventa          INT,
    CONSTRAINT fk_transportadora_envio FOREIGN KEY (idtransportadora) REFERENCES public.transportadora(idtransportadora),
    CONSTRAINT fk_venta_envio          FOREIGN KEY (idventa)          REFERENCES public.venta(idventa)
);

CREATE TABLE public.detalle_envio (
    iddetalleenvio     SERIAL PRIMARY KEY,
    idenvio            INT,
    calle              VARCHAR(100),
    ciudad             VARCHAR(100),
    codigo_postal      VARCHAR(10),
    estado             VARCHAR(20),
    fecha_creacion     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    CONSTRAINT fk_envio_detalle FOREIGN KEY (idenvio) REFERENCES public.registro_envio(idenvio)
);
