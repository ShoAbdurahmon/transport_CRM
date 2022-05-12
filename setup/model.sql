
drop database if exists trasport_sale;

create database transport_sale;

\c transport_sale;

----------------------------------------------



-- MODEL

-- extensions

create extension if not exists "uuid-ossp";

drop table if exists branches;

create table branches (
    branch_id uuid default uuid_generate_v4() primary key,
    branch_name varchar(255) not null,
    branch_address varchar(255) not null,
    time_created timestamptz default current_timestamp
);


drop table if exists transport;

create table transport(
    transport_id uuid default uuid_generate_v4() primary key,
    branch_id uuid not null references branches(branch_id),
    transport_name character varying(255) not null,
    transport_model character varying(255) not null,
    transport_color character varying(255) not null,
    transport_img character varying(255) not null,
    time_created timestamptz default current_timestamp

);

drop table if exists stuff;

create table stuff(
    stuff_id uuid default uuid_generate_v4() primary key,
    branch_id uuid not null references branches(branch_id),
    username character varying(255) not null,
    password character varying(255) not null,
    gender character varying(255) not null,
    time_created timestamptz default current_timestamp
);
