#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE bugbounties (
	    name text NOT NULL,
	    password text NOT NULL
	);

	ALTER TABLE bugbounties OWNER TO postgres;
	CREATE TABLE invites (
	    bugbounty text NOT NULL,
	    email text NOT NULL
	);


	ALTER TABLE invites OWNER TO postgres;
	ALTER TABLE ONLY bugbounties
		ADD CONSTRAINT bugbounties_name_key UNIQUE (name);

EOSQL
