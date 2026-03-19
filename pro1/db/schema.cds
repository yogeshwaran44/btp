namespace mydb;
entity User : Address{
    key id : Integer;
    name : String;
    account : Association to many Bridge on account.user=$self;
    gender : Gender;
    emails : many String;
}

entity Account{
    key id : Integer;
    type : String;
    user : Association to many Bridge on user.account=$self;
}

entity Bridge {
    key user : Association to User;
    key account : Association to Account;
}

type Gender : String enum{male; female; others;};

entity Address{
    street : String;
    city : String;
}