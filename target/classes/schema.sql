create table User
(
	id int(2147483647),
	username varchar(20) unique not null,
	password varchar(20) not null,
	firstName varchar(30) not null,
	lastName varchar(30) not null,
	email varchar(30) not null
);
create table NoteBook (
	id int(2147483647),
	name varchar(50) not null,
	message varchar(50) not null,
	createdTime timestamp not null
);
create table Note (
	id int(2147483647),
	notebook varchar(50),
	message varchar(1000) not null,
	createdTime timestamp not null
);

