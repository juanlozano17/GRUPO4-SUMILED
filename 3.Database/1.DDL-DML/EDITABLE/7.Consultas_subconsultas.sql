
SELECT
    nombre_producto,
    precio,
    estado
FROM  public.producto
WHERE precio > (
    SELECT AVG(precio) FROM public.producto WHERE estado = 'activo'
)
ORDER BY precio DESC;

SELECT
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    u.correo
FROM       public.cliente  c
INNER JOIN public.usuarios u ON u.idusuario = c.idusuario
WHERE c.idcliente NOT IN (
    SELECT DISTINCT idcliente FROM public.venta
);

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
