
entity User{
    key id : Integer;
    name : String;
    city : String;
    dob : Timestamp;
    criticality:Integer;
    role : Composition of  many Role on role.user=$self;
} 

entity Role{
    key id : Integer;
    role_name : String;
    user : Association to User;
}
