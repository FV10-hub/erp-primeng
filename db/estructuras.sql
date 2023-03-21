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
