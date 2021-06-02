create table if not exists specification
(
    specification_id serial primary key,
    specification_name varchar(200) not null,
    xsd_content text not null
);

# create table if not exists extraction_path
# (
#     path_id serial primary key,
#     xpath varchar(200) not null,
# );