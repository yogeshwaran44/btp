namespace mydb;

entity User{
    key id : Integer;
    name : String;
    laptop_ID : Integer;
    laptop : Association to Laptop on laptop.id = $self.laptop_ID;
}

entity Laptop{
    key id : Integer;
    name : String;
}

entity User1 {
    key id : Integer;
    name : String;
}

entity Laptop1 {
    key id : Integer;
    name : String;
    user : Association to User1;
}

entity User2{
    key id : Integer;
    name : String;
    con : Association to many Con on con.user = $self;
}

entity Laptop2{
    key id :Integer;
    name : String;
    con : Association to many Con on con.lap = $self;
}

entity Con {
    key user : Association to User2;
    key lap : Association to Laptop2;
}

entity User3{
    key id : Integer;
    name : String;
    con : Association to many Con1 on con.user_id = $self.id;
}

entity Laptop3{
    key id : Integer;
    name : String;
    con : Association to many Con1 on con.lap_id = $self.id;
}

entity Con1{
    key user_id : Integer;
    key lap_id : Integer;
    user : Association to User3 on user.id = $self.user_id;
    lap : Association to Laptop3 on lap.id = $self.lap_id;
}