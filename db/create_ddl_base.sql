CREATE USER foodlord WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD 'foodlord1234';


CREATE DATABASE foodlord
    WITH
    OWNER = foodlord
    ENCODING = 'utf8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default;


ALTER ROLE foodlord IN DATABASE foodlord SET search_path TO foodlord;