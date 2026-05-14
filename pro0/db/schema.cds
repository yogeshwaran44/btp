namespace mydb;

entity User{
    key id : Integer @title : '{i18n>id}';
    name : String(10);
    image : String;
    mobile : Integer ;
    email: String(15);
    aadhar:Integer;
        description    : LargeString;
        rating : Integer;

}