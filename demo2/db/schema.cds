namespace many_to_many;

// entity Boy {
//     key id : Integer;
//     name : String;
//     friends : Association to  many Friends on friends.boy = $self; 
// }

// entity Girl {
//     key id : Integer;
//     name : String;
//     friends : Association to many Friends on friends.girl = $self;
// }

// entity Friends {
//     key girl : Association to Girl;
//     key boy : Association to Boy;
// }

//--------------------------------------------------------------------------------------------------//

entity User {
    key id : Integer;
    name : String;
    system : Association to many System on system.user = $self;
}

entity Laptop {
    key id : Integer;
    name : String;
    system : Association to many System on system.lap = $self;
}

entity System{
    key user : Association to User;
    key lap : Association to Laptop;
}

//---------------------------------------------------------------------------------------------------//

