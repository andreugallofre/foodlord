CREATE SCHEMA foodlord AUTHORIZATION foodlord;

CREATE SEQUENCE foodlord_report_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE foodlord_report_id_seq
    OWNER TO foodlord;

CREATE SEQUENCE foodlord_ingredient_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE foodlord_ingredient_id_seq
    OWNER TO foodlord;


CREATE TABLE foodlord_user
(
    username character varying(100) NOT NULL COLLATE pg_catalog."default",
    first_name character varying(100) NOT NULL COLLATE pg_catalog."default",
    last_name character varying(100) NOT NULL COLLATE pg_catalog."default",
    email character varying(100) NOT NULL COLLATE pg_catalog."default",
    password character varying(500) NOT NULL COLLATE pg_catalog."default",
    CONSTRAINT foodlord_user_pkey PRIMARY KEY (username)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE foodlord_user
    OWNER to foodlord;

CREATE TABLE foodlord_report
(
    id integer NOT NULL DEFAULT nextval('foodlord_report_id_seq'::regclass),
    time timestamp without time zone NOT NULL,
    calories numeric NOT NULL,
    username character varying(100) NOT NULL COLLATE pg_catalog."default",
    CONSTRAINT foodlord_report_pkey PRIMARY KEY (id),
    CONSTRAINT foodlord_report_username_fkey FOREIGN KEY (username)
        REFERENCES foodlord_user (username) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE foodlord_report
    OWNER to foodlord;


CREATE TABLE foodlord_ingredient
(
    id integer NOT NULL DEFAULT nextval('foodlord_ingredient_id_seq'::regclass),
    report_id integer NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    calories numeric NOT NULL,
    CONSTRAINT foodlord_ingredient_pkey PRIMARY KEY (id),
    CONSTRAINT foodlord_ingredient_report_fkey FOREIGN KEY (report_id)
        REFERENCES foodlord_report (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE foodlord_ingredient
    OWNER to foodlord;


INSERT INTO foodlord_user VALUES ('albert', 'Albert', 'Suarez', 'alsumo95@gmail.com', '72d0166b5707d129dc321e56692fe454c034552ee9e2b38f5a7f1c1306a632ea')