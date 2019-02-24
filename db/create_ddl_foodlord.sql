CREATE SCHEMA foodlord AUTHORIZATION foodlord;

CREATE SEQUENCE foodlord_report_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE foodlord_report_id_seq
    OWNER TO foodlord;

CREATE SEQUENCE foodlord_ingredients_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE foodlord_ingredients_id_seq
    OWNER TO foodlord;


CREATE TABLE foodlord_user
(
    username character varying(100) NOT NULL COLLATE pg_catalog."default",
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    password character varying(500) COLLATE pg_catalog."default",
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
    name character varying(100) COLLATE pg_catalog."default",
    calories float COLLATE pg_catalog."default",
    username character varying(100) NOT NULL COLLATE pg_catalog."default",
    CONSTRAINT foodlord_report_pkey PRIMARY KEY (id),
    CONSTRAINT foodlord_report_username_fkey FOREIGN KEY (project_usereport_usernamername)
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
    name character varying(100) COLLATE pg_catalog."default",
    calories float COLLATE pg_catalog."default",
    CONSTRAINT foodlord_ingredient_pkey PRIMARY KEY (id),
    CONSTRAINT foodlord_report_username_fkey FOREIGN KEY (report_id)
        REFERENCES foodlord_id (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE foodlord_report
    OWNER to foodlord;
