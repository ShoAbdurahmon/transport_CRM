
drop database if exists trasport_sale;

create database transport_sale;

\c transport_sale;

----------------------------------------------



-- MODEL

-- extensions


drop table if exists branch;

create table branch (
    branch_id serial not null primary key,
    branch_name varchar(255) not null,
    branch_address varchar(255) not null,
    time_created timestamptz default current_timestamp
);


drop table if exists transport;

create table transport(
    transport_id serial not null primary key,
    branch_id int not null references branch(branch_id),
    transport_name character varying(255) not null,
    transport_model character varying(255) not null,
    transport_color character varying(255) not null,
    transport_img character varying(255) not null,
    time_created timestamptz default current_timestamp

);

drop table if exists stuff;

create table stuff(
    stuff_id serial not null primary key,
    branch_id int not null references branch(branch_id),
    username character varying(255) not null,
    password character varying(255) not null,
    birth_date varchar(16) not null,
    gender character varying(255) not null,
    time_created timestamptz default current_timestamp
);


drop table if exists transport_permission;

create table transport_permission(
    transport_permission_id serial not null primary key,
    transport_create boolean default false,
    transport_read boolean default false,
    transport_delete boolean default false,
    transport_update boolean default false,
    staff_id serial not null references stuff(stuff_id)
);

drop table if exists branch_permission;

create table branch_permission(
    branch_permission_id serial not null primary key,
    branch_create boolean default false,
    branch_read boolean default false,
    branch_delete boolean default false,
    branch_update boolean default false,
    stuff_id serial not null references stuff(stuff_id)
)

