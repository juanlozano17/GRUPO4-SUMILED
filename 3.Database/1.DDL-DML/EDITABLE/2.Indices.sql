
CREATE INDEX idx_usuarios_rol       ON public.usuarios(id_rol);
CREATE INDEX idx_cliente_usuario    ON public.cliente(idusuario);
CREATE INDEX idx_producto_categoria ON public.producto(idcategoria);
CREATE INDEX idx_venta_cliente      ON public.venta(idcliente);
CREATE INDEX idx_venta_mediopago    ON public.venta(idmedio_pago);
CREATE INDEX idx_detalle_venta      ON public.detalle_venta(idventa);
CREATE INDEX idx_detalle_producto   ON public.detalle_venta(idproducto);
CREATE INDEX idx_envio_venta        ON public.registro_envio(idventa);
