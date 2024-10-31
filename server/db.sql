create table task(
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('My Test Task')
insert into task (description) values ('second test')
