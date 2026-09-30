create table if not exists produtos (
id int auto_increment primary key, 
nome varchar(255) not null,
preco decimal(10,2) not null,
estoque int not null default 0,
categoria varchar(100) not null
);