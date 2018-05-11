create table User
(
	id int(2147483647),
	username varchar(20) unique not null,
	password varchar(20) not null,
	firstName varchar(30) not null,
	lastName varchar(30) not null,
	email varchar(30) not null
);