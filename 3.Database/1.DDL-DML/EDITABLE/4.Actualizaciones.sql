
UPDATE public.producto
SET    precio             = ROUND(precio * 1.10, 2),
       fecha_modificacion = NOW()
WHERE  nombre_producto LIKE '%Philips%';

UPDATE public.producto
SET    estado             = 'inactivo',
       fecha_modificacion = NOW()
WHERE  nombre_producto = 'Llave Inglesa 10" Black+Decker';

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

UPDATE public.venta
SET    estado             = 'reembolsado',
       fecha_modificacion = NOW()
WHERE  estado = 'cancelado';

UPDATE public.cliente
SET    telefono           = '3119998877',
       direccion          = 'Cll 116 # 55-10 Bogotá',
       fecha_modificacion = NOW()
WHERE  nombre   = 'Andres'
AND    apellido = 'Ramirez';
