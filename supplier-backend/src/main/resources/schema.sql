SET timezone = 'Europe/Paris';

create table if not exists formular
(
    form_id serial primary key,
    received_timestamp timestamptz not null,
    processing_duration serial,
    file_name varchar(5000) not null unique,
    file_type varchar(20) not null,
    file_size serial,
    content text not null,
    tenant_id serial,
    source_drive varchar(20) not null,
    check (tenant_id >= 0 and tenant_id < 10000)
);