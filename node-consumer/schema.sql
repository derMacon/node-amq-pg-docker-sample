SET timezone = 'Europe/Paris';

create table if not exists specification
(
	specification_name varchar(10000) not null unique primary key,
	specification_xsd text not null unique
);

create table if not exists payment
(
    payment_id serial primary key,
	extracted_element text not null,
	specification_name varchar(10000) not null,
	-- foreign key (specification_name) references specification (specification_name),
    sent_timestamp timestamp(3) not null,
    received_timestamp timestamp(3) not null,
    processed_timestamp timestamp(3) not null,
	content text not null
);
