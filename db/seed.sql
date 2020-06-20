

-- Makes it so all of the following code will affect empltracker --
USE empltracker;

-- create some data to add to tables above
INSERT INTO department(name)
VALUES 
("Management"),
("Logistics"),
("Sales"),
("Research");

INSERT INTO role (title,salary,department_id)
VALUES
("CEO",1000,1),
("Accountant",70,2),
("Salesman",50,3),
("Scientist",100,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
 ("Anna", "Green",  1,  null),
 ("Joseph", "Smith",  2,  null),
 ("Maria",  "Gutierrez",  5, 1),
 ("Shawn",  "Lamb", 6, 1),
 ("Suzan",  "Keen", 3, 1),
 ("Sophia", "Henk", 4, 1),
 ("Paul", "Santos", 3, 2),
 ("Jennifer", "Stuart", 4, 2);
