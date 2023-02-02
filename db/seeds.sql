
use employees_db

INSERT INTO department_list 
(dept_name)
    VALUES 
    ( "Executive"),
    ( "Management"),
    ( "Administrative"),
    ( "Security"),
    ( "Medical");


INSERT INTO role_list 
( title, salary, department_list_id)
    VALUES 
    ( "Captain", 5000, 1),
    ( "Cmdr", 2500, 2),
    ( "Lt", 2250, 2),
    ( "Lt Cmdr", 2250, 3),
    ( "Lt Cmdrs", 2350, 3),
    ( "Counselor", 3000, 4),
    ( "Doctor", 2150, 2);



INSERT INTO employee_list ( first_name, last_name, role_list_id,  manager_id )
    VALUES 
    ( "Jean-Luc", "Picard", 4, 1),
    ( "William", "Riker", 4, 2),
    ( "Worf", "worst", 4,1),
    ( "Data", "dood", 2, NULL),
    ( "Geordi", "La Forge", 2, 3),
    ( "Deanna", "Troi", 1, 6),
    ( "Beverly", "Crusher", 3, NULL);

