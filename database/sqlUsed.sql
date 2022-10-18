--Esto es en SQL server
CREATE TABLE info_users(
	id int IDENTITY(1,1) PRIMARY KEY,
	userName varchar(20),
	password varchar(70)
)
--Ver los resultados
SELECT * FROM info_users

CREATE TABLE contact(
	id int FOREIGN KEY REFERENCES info_users,
	nameContact varchar(40),
	phoneNumber char(10),
	CONSTRAINT  fk_id_user
	FOREIGN KEY (id)
	REFERENCES info_users
)
SELECT * FROM contact where id="id de usuario"