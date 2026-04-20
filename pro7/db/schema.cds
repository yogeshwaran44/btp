namespace mydb;

entity User{
    key id : Integer;
    name : String;
    city : String;
    laptop  : Association to many Laptop on laptop.user.id=id;
}

entity Laptop{
    key id : Integer;
    name : String;
    user : Association to User;
}