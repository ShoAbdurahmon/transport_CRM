insert into branch (branch_name, branch_address) values
('Chilonzor', 'chilonzor 9, nmadir ko''chasi, 14 uy'),
('Chimboy', 'olmazor ko''chasi 5 uy'),
('Xadra', 'Abdulla Qodiriy ko''chasi 12 uy');


insert into transport (branch_id,transport_name, transport_model, transport_color, transport_img) values
('1', 'chevrolet', 'Cobalet', 'white', 'cobalet.jpeg'),
('1', 'chevrolet', 'Tesla X', 'blue', 'tesla.jpeg'),
('2', 'chevrolet', 'Spart', 'black', 'spark.jpeg'),
('2', 'chevrolet', 'Nexia 3', 'white', 'nexia.jpeg'),
('3', 'chevrolet', 'Captiva', 'red', 'captiva.jpeg'),
('3', 'chevrolet', 'Maluba', 'white', 'maluba.jpeg');


insert into stuff (branch_id, username, password, birth_date, gender) values
(1, 'Alisher', '1234', '1984-03-12', 'male'),
(2, 'Abdug''ani', '3344', '2021-03-12', 'male'),
(3, 'Asal', 'root', '2000-03-12', 'female'),
(3, 'Jonon', 'root', '2000-03-12', 'female');



insert into transport_permission (stuff_id, transport_create, transport_delete, transport_read, transport_update) values
(4, 'true', 'true', 'true', 'true');
insert into branch_permission(stuff_id, branch_create, branch_delete, branch_read, branch_update) values
(4, 'true', 'true', 'true', 'true');