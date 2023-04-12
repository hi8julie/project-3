DROP TABLE IF EXISTS visitation

CREATE TABLE visitation (
    park_id INT NOT NULL,
    state VARCHAR(30) NOT NULL,
	national_park VARCHAR(80) NOT NULL, 
	visitation_2022 VARCHAR(50) NOT NULL,
	total_recreation_visitor_hours_2022 VARCHAR(50) NOT NULL,
	visitation_2021 VARCHAR(50) NOT NULL,
	total_recreation_visitor_hours_2021 VARCHAR(50) NOT NULL,
	visitation_2020 VARCHAR(50) NOT NULL,
	total_recreation_visitor_hours_2020 VARCHAR(50) NOT NULL,
	constraint pk_visitation PRIMARY KEY (
park_id)
);

SELECT * FROM visitation 