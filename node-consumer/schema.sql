SET timezone = 'Europe/Paris';

create table if not exists specification
(
	specification_id serial primary key,
	specification_name varchar(10000) not null unique,
	specification_xsd text not null unique
);

create table if not exists payment
(
    payment_id serial primary key,
	content text not null unique,
	extracted_element text not null unique,
	specification_id integer not null unique,
	foreign key (specification_id) references specification (specification_id),
    sent_timestamp timestamptz not null,
    received_timestamp timestamptz not null,
    processed_timestamp timestamptz not null
);
