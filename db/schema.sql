drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table department (
    id int auto_increment,
    name varchar(30) not null,
    primary key (id)
);

create table employee (
    id int auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int(10) not null,
    manager_id int(10),
    is_manager boolean,
    primary key (id)
);

create table position (
    id int auto_increment,
	title varchar(30) not null,
    salary varchar(30) not null,
    department_id int(10) not null,
    primary key (id)
);

