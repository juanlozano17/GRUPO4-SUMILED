
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
