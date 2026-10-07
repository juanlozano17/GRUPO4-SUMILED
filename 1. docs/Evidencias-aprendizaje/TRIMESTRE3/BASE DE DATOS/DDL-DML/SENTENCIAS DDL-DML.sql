-- ============================================================
--  FERRETERÍA & ILUMINACIÓN  |  Script único completo
--  Correr TODO de una sola vez, en este orden
-- ============================================================

-- ------------------------------------------------------------
-- TABLAS
-- ------------------------------------------------------------

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
    nombre             VARCHAR(100) NO,
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

-- ------------------------------------------------------------
-- ÍNDICES
-- ------------------------------------------------------------

CREATE INDEX idx_usuarios_rol       ON public.usuarios(id_rol);
CREATE INDEX idx_cliente_usuario    ON public.cliente(idusuario);
CREATE INDEX idx_producto_categoria ON public.producto(idcategoria);
CREATE INDEX idx_venta_cliente      ON public.venta(idcliente);
CREATE INDEX idx_venta_mediopago    ON public.venta(idmedio_pago);
CREATE INDEX idx_detalle_venta      ON public.detalle_venta(idventa);
CREATE INDEX idx_detalle_producto   ON public.detalle_venta(idproducto);
CREATE INDEX idx_envio_venta        ON public.registro_envio(idventa);


-- ============================================================
--  DATOS  (respetar este orden por las FK)
-- ============================================================

-- 1. Roles
INSERT INTO public.roles (nombre) VALUES
    ('Administrador'),  -- id 1
    ('Cliente');        -- id 2

-- 2. Medios de pago
INSERT INTO public.medio_de_pago (nombre, tipo_med) VALUES
    ('Tarjeta',  'Electronico'),  -- id 1
    ('Efectivo', 'Fisico'),       -- id 2
    ('Pagos QR', 'Electronico');  -- id 3

-- 3. Categorías  (UNA SOLA VEZ, todas juntas)
INSERT INTO public.categorias (nombre) VALUES
    ('Ferreteria'),           -- id 1
    ('Iluminaria'),           -- id 2
    ('Herramientas Manuales'),-- id 3
    ('Electricidad'),         -- id 4
    ('Iluminacion LED');      -- id 5

-- 4. Proveedores
INSERT INTO public.proveedores (nombre_proveedor, contacto, correo, telefono) VALUES
    ('Distribuidora Ferrelectricos Ltda', 'Pedro Suarez',  'pedros@ferrelectricos.com', '3101234567'),
    ('Ilumina Colombia SAS',              'Laura Herrera', 'lherrera@iluminacol.com',   '3209876543'),
    ('Herramientas Pro Andina',           'Diego Mora',    'dmora@hpandina.com',        '3155556677');

-- 5. Transportadoras
INSERT INTO public.transportadora (telefono, nombre_transportadora, pagina_web) VALUES
    ('6017000000', 'Servientrega',     'servientrega.com.co'),
    ('6014440000', 'Coordinadora',     'coordinadora.com.co'),
    ('3107000001', 'Interrapidisimo',  'interrapidisimo.com');

-- 6. Usuarios
INSERT INTO public.usuarios (id_rol, nombre, correo, contrasena, fecha_creacion) VALUES
    (2, 'Carlos Lopez',      'carlos@mail.com',    '$2b$12$placeholder_hash_1', NOW()),  -- id 1
    (2, 'Santiago Cardenas', 'santiago@mail.com',  '$2b$12$placeholder_hash_2', NOW()),  -- id 2
    (2, 'Juan Lozano',       'juan@mail.com',       '$2b$12$placeholder_hash_3', NOW()),  -- id 3
    (2, 'Mariana Gonzalez',  'mariana@mail.com',   '$2b$12$placeholder_hash_4', NOW()),  -- id 4
    (2, 'Andres Ramirez',    'andres@mail.com',    '$2b$12$placeholder_hash_5', NOW()),  -- id 5
    (2, 'Lucia Pedraza',     'lucia@mail.com',     '$2b$12$placeholder_hash_6', NOW()),  -- id 6
    (1, 'Admin Ferreteria',  'admin@ferreria.com', '$2b$12$placeholder_hash_7', NOW());  -- id 7

-- 7. Clientes
INSERT INTO public.cliente (idusuario, nombre, apellido, direccion, telefono) VALUES
    (1, 'Carlos',   'Lopez',    'Cra 15 # 90-20 Bogotá',  '3101112233'),  -- id 1
    (2, 'Santiago', 'Cardenas', 'Cll 80 # 22-05 Bogotá',  '3102223344'),  -- id 2
    (3, 'Juan',     'Lozano',   'Av El Dorado 68C Bogotá', '3103334455'),  -- id 3
    (4, 'Mariana',  'Gonzalez', 'Cra 7 # 45-12 Bogotá',   '3104445566'),  -- id 4
    (5, 'Andres',   'Ramirez',  'Cra 7 # 45-12 Bogotá',   '3112223344'),  -- id 5
    (6, 'Lucia',    'Pedraza',  'Cll 80 # 22-05 Bogotá',  '3123334455');  -- id 6

-- 8. Productos  (todos con idcategoria que YA existe arriba)
INSERT INTO public.producto (idcategoria, nombre_producto, precio, estado) VALUES
    (3, 'Martillo Carpintero 16oz Stanley',         32900,  'activo'),   -- id 1
    (3, 'Destornillador Pala 6" Tramontina',          8900,  'activo'),  -- id 2
    (3, 'Alicate Universal 8" Bahco',                45900,  'activo'),  -- id 3
    (3, 'Llave Inglesa 10" Black+Decker',            38500,  'activo'),  -- id 4
    (4, 'Cinta LED RGB 5m 12V impermeable',          67900,  'activo'),  -- id 5
    (4, 'Bombillo LED 9W E27 luz fria Philips',       6900,  'activo'),  -- id 6
    (4, 'Bombillo LED 9W E27 luz calida Philips',     6900,  'activo'),  -- id 7
    (4, 'Panel LED Empotrable 18W 6500K',            52000,  'activo'),  -- id 8
    (5, 'Lampara Colgante Industrial Ada Grey',     342000,  'activo'),  -- id 9
    (5, 'Tira LED Neon Flex 5m Rosa',                89000,  'activo');  -- id 10

-- 9. Relación producto-proveedor
INSERT INTO public.producto_proveedor (idproducto, idproveedor, precio_compra_actual) VALUES
    (1,  3, 21000),
    (2,  3,  4500),
    (3,  3,  6200),
    (4,  3, 29000),
    (5,  2, 34000),
    (6,  2,  3200),
    (7,  2,  3200),
    (8,  2, 28000),
    (9,  2,190000),
    (10, 2, 48000);

-- 10. Ventas
INSERT INTO public.venta (idmedio_pago, idcliente, fecha_pedido, total, estado) VALUES
    (1, 1, '2024-11-05',  32900, 'entregado'),   -- id 1
    (1, 2, '2024-11-10',  67900, 'entregado'),   -- id 2
    (2, 3, '2024-11-15',  45900, 'entregado'),   -- id 3
    (3, 4, '2024-11-20', 342000, 'entregado'),   -- id 4
    (1, 5, '2024-12-01',  52000, 'enviado'),     -- id 5
    (2, 1, '2024-12-05',  89000, 'pendiente'),   -- id 6
    (1, 2, '2024-12-08',  24700, 'entregado'),   -- id 7
    (2, 3, '2024-12-09',  38500, 'enviado'),     -- id 8
    (3, 4, '2024-12-11',  27600, 'pendiente'),   -- id 9
    (1, 5, '2024-12-12',  78800, 'cancelado');   -- id 10

-- 11. Detalles de venta
INSERT INTO public.detalle_venta (idventa, idproducto, cantidad, precio_unitario) VALUES
    (1,  1,  1,  32900),
    (2,  5,  1,  67900),
    (3,  3,  1,  45900),
    (4,  9,  1, 342000),
    (5,  8,  1,  52000),
    (6,  10, 1,  89000),
    (7,  6,  3,   6900),
    (7,  2,  1,   8900),
    (8,  4,  1,  38500),
    (9,  7,  4,   6900),
    (10, 1,  1,  32900),
    (10, 3,  1,  45900);

-- 12. Envíos
INSERT INTO public.registro_envio (idtransportadora, numero_guia, fecha_envio, estado, idventa) VALUES
    (1, 'SRV-2024-00123', '2024-11-06', 'entregado', 1),
    (1, 'SRV-2024-00456', '2024-11-11', 'entregado', 2),
    (2, 'COR-2024-00789', '2024-11-16', 'entregado', 3),
    (1, 'SRV-2024-01011', '2024-11-21', 'entregado', 4),
    (3, 'IRP-2024-01213', '2024-12-02', 'en_camino', 5),
    (2, 'COR-2024-01415', '2024-12-10', 'en_camino', 8);

-- 13. Detalles de envío
INSERT INTO public.detalle_envio (idenvio, calle, ciudad, codigo_postal, estado) VALUES
    (1, 'Cra 15 # 90-20',   'Bogotá', '110221', 'entregado'),
    (2, 'Cll 80 # 22-05',   'Bogotá', '110911', 'entregado'),
    (3, 'Av El Dorado 68C', 'Bogotá', '110931', 'entregado'),
    (4, 'Cra 7 # 45-12',    'Bogotá', '110221', 'entregado'),
    (5, 'Cra 7 # 45-12',    'Bogotá', '110221', 'en_camino'),
    (6, 'Cll 80 # 22-05',   'Bogotá', '110911', 'en_camino');


-- ============================================================
--  5 UPDATES
-- ============================================================

-- UPDATE 1: Subir 10% el precio de los bombillos LED Philips
--           por aumento del proveedor Ilumina Colombia
UPDATE public.producto
SET    precio             = ROUND(precio * 1.10, 2),
       fecha_modificacion = NOW()
WHERE  nombre_producto LIKE '%Philips%';

-- UPDATE 2: Marcar como inactivo la Llave Inglesa (agotada en bodega)
UPDATE public.producto
SET    estado             = 'inactivo',
       fecha_modificacion = NOW()
WHERE  nombre_producto = 'Llave Inglesa 10" Black+Decker';

-- UPDATE 3: Renegociación con Ilumina Colombia — nuevo precio de compra del Panel LED
UPDATE public.producto_proveedor
SET    precio_compra_actual = 24500
WHERE  idproducto = (
           SELECT idproducto FROM public.producto
           WHERE  nombre_producto = 'Panel LED Empotrable 18W 6500K'
       )
AND    idproveedor = (
           SELECT idproveedor FROM public.proveedores
           WHERE  nombre_proveedor = 'Ilumina Colombia SAS'
       );

-- UPDATE 4: Cambiar venta cancelada a reembolsado
UPDATE public.venta
SET    estado             = 'reembolsado',
       fecha_modificacion = NOW()
WHERE  estado = 'cancelado';

-- UPDATE 5: Actualizar datos de contacto del cliente Andres Ramirez
UPDATE public.cliente
SET    telefono           = '3119998877',
       direccion          = 'Cll 116 # 55-10 Bogotá',
       fecha_modificacion = NOW()
WHERE  nombre   = 'Andres'
AND    apellido = 'Ramirez';


-- ============================================================
--  5 DELETEs  (orden respeta FK)
-- ============================================================

-- DELETE 1: Detalle de envío del pedido reembolsado
DELETE FROM public.detalle_envio
WHERE idenvio IN (
    SELECT idenvio FROM public.registro_envio
    WHERE  idventa IN (
        SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
    )
);

-- DELETE 2: Registro de envío del pedido reembolsado
DELETE FROM public.registro_envio
WHERE idventa IN (
    SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
);

-- DELETE 3: Detalle de venta del pedido reembolsado
DELETE FROM public.detalle_venta
WHERE idventa IN (
    SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
);

-- DELETE 4: Venta reembolsada ya sin dependencias
DELETE FROM public.venta
WHERE estado = 'reembolsado';

-- DELETE 5: Limpiar productos inactivos sin historial de ventas
DELETE FROM public.producto_proveedor
WHERE idproducto IN (
    SELECT p.idproducto
    FROM   public.producto p
    LEFT JOIN public.detalle_venta dv ON dv.idproducto = p.idproducto
    WHERE  p.estado   = 'inactivo'
    AND    dv.idventa IS NULL
);

DELETE FROM public.producto
WHERE  estado = 'inactivo'
AND    idproducto NOT IN (
    SELECT DISTINCT idproducto FROM public.detalle_venta
);


-- ============================================================
--  5 JOINs
-- ============================================================

-- JOIN 1: Ventas completas con cliente, medio de pago y estado del envío
SELECT
    v.idventa,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    mp.nombre                          AS medio_pago,
    v.fecha_pedido,
    v.total,
    v.estado                           AS estado_venta,
    re.estado                          AS estado_envio,
    re.numero_guia
FROM       public.venta          v
INNER JOIN public.cliente        c  ON c.idcliente     = v.idcliente
INNER JOIN public.medio_de_pago  mp ON mp.idmedio_pago = v.idmedio_pago
LEFT  JOIN public.registro_envio re ON re.idventa      = v.idventa
ORDER BY v.fecha_pedido DESC;

-- JOIN 2: Detalle línea por línea con producto, categoría y subtotal 
SELECT
    dv.idventa,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    p.nombre_producto,
    cat.nombre                         AS categoria,
    dv.cantidad,
    dv.precio_unitario,
    (dv.cantidad * dv.precio_unitario) AS subtotal
FROM       public.detalle_venta dv
INNER JOIN public.producto       p   ON p.idproducto    = dv.idproducto
INNER JOIN public.categorias     cat ON cat.idcategoria = p.idcategoria
INNER JOIN public.venta          v   ON v.idventa       = dv.idventa
INNER JOIN public.cliente        c   ON c.idcliente     = v.idcliente
ORDER BY dv.idventa, p.nombre_producto;

-- JOIN 3: Productos con proveedor y margen de ganancia
SELECT
    p.nombre_producto,
    cat.nombre                                        AS categoria,
    pr.nombre_proveedor,
    pp.precio_compra_actual                           AS precio_compra,
    p.precio                                          AS precio_venta,
    (p.precio - pp.precio_compra_actual)              AS ganancia_unidad,
    ROUND(
        (p.precio - pp.precio_compra_actual)
        / pp.precio_compra_actual * 100
    , 1)                                              AS margen_pct
FROM       public.producto           p
INNER JOIN public.categorias         cat ON cat.idcategoria = p.idcategoria
INNER JOIN public.producto_proveedor pp  ON pp.idproducto  = p.idproducto
INNER JOIN public.proveedores        pr  ON pr.idproveedor = pp.idproveedor
ORDER BY margen_pct DESC;

-- JOIN 4: Envíos activos con transportadora, destino y cliente
SELECT
    re.numero_guia,
    t.nombre_transportadora,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    c.telefono,
    de.calle,
    de.ciudad,
    de.codigo_postal,
    re.fecha_envio,
    re.estado
FROM       public.registro_envio re
INNER JOIN public.transportadora t  ON t.idtransportadora = re.idtransportadora
INNER JOIN public.venta          v  ON v.idventa          = re.idventa
INNER JOIN public.cliente        c  ON c.idcliente        = v.idcliente
INNER JOIN public.detalle_envio  de ON de.idenvio         = re.idenvio
WHERE re.estado != 'entregado'
ORDER BY re.fecha_envio;

-- JOIN 5: Ranking de clientes por total comprado
SELECT
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    c.telefono,
    COUNT(v.idventa)                   AS total_pedidos,
    SUM(v.total)                       AS total_comprado
FROM       public.cliente c
INNER JOIN public.venta   v ON v.idcliente = c.idcliente
WHERE v.estado NOT IN ('cancelado', 'reembolsado')
GROUP BY c.idcliente, c.nombre, c.apellido, c.telefono
ORDER BY total_comprado DESC;


-- ============================================================
--  5 SUBCONSULTAS
-- ============================================================

-- SUBCONSULTA 1: Productos con precio sobre el promedio del catálogo
SELECT
    nombre_producto,
    precio,
    estado
FROM  public.producto
WHERE precio > (
    SELECT AVG(precio) FROM public.producto WHERE estado = 'activo'
)
ORDER BY precio DESC;

-- SUBCONSULTA 2: Clientes que nunca han comprado
SELECT
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    u.correo
FROM       public.cliente  c
INNER JOIN public.usuarios u ON u.idusuario = c.idusuario
WHERE c.idcliente NOT IN (
    SELECT DISTINCT idcliente FROM public.venta
);

-- SUBCONSULTA 3: Producto más vendido por unidades
SELECT
    p.nombre_producto,
    cat.nombre AS categoria,
    p.precio,
    totales.unidades
FROM public.producto p
INNER JOIN public.categorias cat ON cat.idcategoria = p.idcategoria
INNER JOIN (
    SELECT idproducto, SUM(cantidad) AS unidades
    FROM   public.detalle_venta
    GROUP  BY idproducto
) AS totales ON totales.idproducto = p.idproducto
WHERE totales.unidades = (
    SELECT MAX(suma) FROM (
        SELECT SUM(cantidad) AS suma
        FROM   public.detalle_venta
        GROUP  BY idproducto
    ) AS sub
);

-- SUBCONSULTA 4: Ventas que superan el promedio del mes
SELECT
    v.idventa,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    v.fecha_pedido,
    v.total,
    mes_prom.promedio_mes
FROM       public.venta   v
INNER JOIN public.cliente c ON c.idcliente = v.idcliente
INNER JOIN (
    SELECT
        DATE_TRUNC('month', fecha_pedido) AS mes,
        ROUND(AVG(total), 2)              AS promedio_mes
    FROM  public.venta
    WHERE estado NOT IN ('cancelado', 'reembolsado')
    GROUP BY mes
) AS mes_prom ON DATE_TRUNC('month', v.fecha_pedido) = mes_prom.mes
WHERE v.total > mes_prom.promedio_mes
ORDER BY v.fecha_pedido;

-- SUBCONSULTA 5: Proveedor con mayor variedad de productos
SELECT
    pr.nombre_proveedor,
    pr.correo,
    pr.telefono,
    conteo.total_productos
FROM public.proveedores pr
INNER JOIN (
    SELECT idproveedor, COUNT(idproducto) AS total_productos
    FROM   public.producto_proveedor
    GROUP  BY idproveedor
) AS conteo ON conteo.idproveedor = pr.idproveedor
WHERE conteo.total_productos = (
    SELECT MAX(cnt) FROM (
        SELECT COUNT(idproducto) AS cnt
        FROM   public.producto_proveedor
        GROUP  BY idproveedor
    ) AS sub
);