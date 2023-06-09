--clientes
CREATE TABLE public.clientes
(
    id bigint NOT NULL DEFAULT nextval('clientes_id_seq'::regclass),
    create_at date,
    documento character varying(255) COLLATE pg_catalog."default",
    nombre_completo character varying(255) COLLATE pg_catalog."default",
    telefono character varying(255) COLLATE pg_catalog."default",
    chapa character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT clientes_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.clientes
    OWNER to postgres;

--productos
CREATE TABLE public.productos
(
    id bigint NOT NULL DEFAULT nextval('productos_id_seq'::regclass),
    codigo_barra character varying(255) COLLATE pg_catalog."default",
    create_at date,
    descripcion character varying(255) COLLATE pg_catalog."default",
    existencia integer,
    precio double precision,
    precio_costo double precision,
    CONSTRAINT productos_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.productos
    OWNER to postgres;

--facturas
CREATE TABLE public.facturas
(
    id bigint NOT NULL DEFAULT nextval('facturas_id_seq'::regclass),
    create_at date,
    descripcion character varying(255) COLLATE pg_catalog."default",
    observacion character varying(255) COLLATE pg_catalog."default",
    cliente_id bigint,
    nro_factura character varying(50) COLLATE pg_catalog."default",
    total_factura bigint,
    CONSTRAINT facturas_pkey PRIMARY KEY (id),
    CONSTRAINT fk1qiuk10rfkovhlfpsk7oic0v8 FOREIGN KEY (cliente_id)
        REFERENCES public.clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.facturas
    OWNER to postgres;

--facturas detalle
CREATE TABLE public.facturas_detalles
(
    id bigint NOT NULL DEFAULT nextval('facturas_detalles_id_seq'::regclass),
    cantidad integer,
    producto_id bigint,
    factura_id bigint,
    total_linea bigint,
    CONSTRAINT facturas_detalles_pkey PRIMARY KEY (id),
    CONSTRAINT fk4onn95k4hxkwr3172qajdsu7c FOREIGN KEY (producto_id)
        REFERENCES public.productos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk8d1rgbo5fxr1148ep7r9tdspe FOREIGN KEY (factura_id)
        REFERENCES public.facturas (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.facturas_detalles
    OWNER to postgres;

--proveedores
CREATE TABLE public.proveedor
(
    id bigint NOT NULL DEFAULT nextval('proveedor_id_seq'::regclass),
    create_at date,
    documento character varying(255) COLLATE pg_catalog."default",
    nombre_completo character varying(255) COLLATE pg_catalog."default",
    telefono character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT proveedor_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.proveedor
    OWNER to postgres;


--compras
CREATE TABLE public.compras
(
    id bigint NOT NULL DEFAULT nextval('compras_id_seq'::regclass),
    create_at date,
    descripcion character varying(255) COLLATE pg_catalog."default",
    nro_factura character varying(255) COLLATE pg_catalog."default",
    observacion character varying(255) COLLATE pg_catalog."default",
    total_compra numeric(38, 2),
    proveedor_id bigint,
    CONSTRAINT compras_pkey PRIMARY KEY (id),
    CONSTRAINT fk5clsikm051qlae1d6xjkpaik6 FOREIGN KEY (proveedor_id)
        REFERENCES public.proveedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.compras
    OWNER to postgres;

--compras detalle
CREATE TABLE public.compras_detalles
(
    id bigint NOT NULL DEFAULT nextval('compras_detalles_id_seq'::regclass),
    cantidad integer,
    total_linea numeric(38, 2),
    producto_id bigint,
    compra_id bigint,
    CONSTRAINT compras_detalles_pkey PRIMARY KEY (id),
    CONSTRAINT fk3otvyak6obfnc1qt9fo03vqbl FOREIGN KEY (producto_id)
        REFERENCES public.productos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fknh214xmdog1hmmt03isq45l0i FOREIGN KEY (compra_id)
        REFERENCES public.compras (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.compras_detalles
    OWNER to postgres;

--ajustes
CREATE TABLE public.ajuste_stock
(
    id bigint NOT NULL DEFAULT nextval('ajuste_stock_id_seq'::regclass),
    create_at date,
    observacion character varying(255) COLLATE pg_catalog."default",
    total_costo numeric(38, 2),
    proveedor_id bigint,
    CONSTRAINT ajuste_stock_pkey PRIMARY KEY (id),
    CONSTRAINT fknqca7i07vwwinho5bam2u1k4m FOREIGN KEY (proveedor_id)
        REFERENCES public.proveedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ajuste_stock
    OWNER to postgres;

--ajustes detalles
CREATE TABLE public.ajuste_stock_detalle
(
    id bigint NOT NULL DEFAULT nextval('ajuste_stock_detalle_id_seq'::regclass),
    cantidad integer,
    total_linea numeric(38, 2),
    producto_id bigint,
    ajuste_stock_id bigint,
    CONSTRAINT ajuste_stock_detalle_pkey PRIMARY KEY (id),
    CONSTRAINT fk6yhrgv0ppb04hohq78b5po80h FOREIGN KEY (ajuste_stock_id)
        REFERENCES public.ajuste_stock (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkimuhaj41un7w8ypyqe8ovs8vf FOREIGN KEY (producto_id)
        REFERENCES public.productos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ajuste_stock_detalle
    OWNER to postgres;

CREATE OR REPLACE FUNCTION actualizar_existencia()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = existencia - NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = existencia + OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_existencia_ventas
AFTER INSERT OR DELETE ON facturas_detalles
FOR EACH ROW
EXECUTE PROCEDURE actualizar_existencia();


CREATE OR REPLACE FUNCTION actualizar_existencia_compras()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = existencia + NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = existencia - OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_existencia_compras
AFTER INSERT OR DELETE ON compras_detalles
FOR EACH ROW
EXECUTE PROCEDURE actualizar_existencia_compras();



CREATE OR REPLACE FUNCTION actualizar_existencia_inventario()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_existencia_ajuste
AFTER INSERT OR DELETE ON ajuste_stock_detalle
FOR EACH ROW
EXECUTE PROCEDURE actualizar_existencia_inventario();

ALTER TABLE public.facturas_detalles
ADD COLUMN descuento numeric(38, 2);

--BACKUP DE FUENTE DE LUBRICAMPEON
/*
CREATE OR REPLACE FUNCTION public.actualizar_existencia()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = existencia - NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = existencia + OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.actualizar_existencia()
    OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.actualizar_existencia_compras()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = existencia + NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = existencia - OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.actualizar_existencia_compras()
    OWNER TO postgres;

CREATE OR REPLACE FUNCTION public.actualizar_existencia_inventario()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.productos SET existencia = NEW.cantidad WHERE id = NEW.producto_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.productos SET existencia = OLD.cantidad WHERE id = OLD.producto_id;
    RETURN OLD;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.actualizar_existencia_inventario()
    OWNER TO postgres;

CREATE TRIGGER actualizar_existencia_ajuste
    AFTER INSERT OR DELETE
    ON public.ajuste_stock_detalle
    FOR EACH ROW
    EXECUTE FUNCTION public.actualizar_existencia_inventario();

CREATE TRIGGER actualizar_existencia_compras
    AFTER INSERT OR DELETE
    ON public.compras_detalles
    FOR EACH ROW
    EXECUTE FUNCTION public.actualizar_existencia_compras();

CREATE TRIGGER actualizar_existencia_ventas
    AFTER INSERT OR DELETE
    ON public.facturas_detalles
    FOR EACH ROW
    EXECUTE FUNCTION public.actualizar_existencia();*/
