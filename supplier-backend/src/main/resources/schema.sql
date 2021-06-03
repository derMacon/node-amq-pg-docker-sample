create table if not exists payment_message
(
    batch_id serial primary key,
    sent_timestamp timestamp(3) not null,
    x_path varchar(300) not null,
    content text not null
);