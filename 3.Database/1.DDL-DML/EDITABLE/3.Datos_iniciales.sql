
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
