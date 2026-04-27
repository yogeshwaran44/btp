namespace mydb;

// entity User{
//     key id : Integer;
//     name : String;
//     city : String;
    // address : Address;
    // laptop  : Association to many Laptop on laptop.user.id=id;
// }

// entity Laptop{
//     key id : Integer;
//     name : String;
//     user : Association to User;
// }

// type Address{
//     city : String;
//     state : String;
// }




entity User{
    key id: Integer;
    name : String;
    connection : Association to many Connection on connection.user = $self;
}
entity Laptop{
    key id: Integer;
    name : String;
    connection : Association to many Connection on connection.laptop = $self;
}
entity Connection{
    key user : Association to User;
    key laptop : Association to Laptop;
}