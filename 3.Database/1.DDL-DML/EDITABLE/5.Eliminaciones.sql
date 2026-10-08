
DELETE FROM public.detalle_envio
WHERE idenvio IN (
    SELECT idenvio FROM public.registro_envio
    WHERE  idventa IN (
        SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
    )
);

DELETE FROM public.registro_envio
WHERE idventa IN (
    SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
);

DELETE FROM public.detalle_venta
WHERE idventa IN (
    SELECT idventa FROM public.venta WHERE estado = 'reembolsado'
);

DELETE FROM public.venta
WHERE estado = 'reembolsado';

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
