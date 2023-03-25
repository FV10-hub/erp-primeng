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
