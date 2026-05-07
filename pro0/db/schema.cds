namespace mydb;

entity User{
    key id : Integer @title : '{i18n>id}';
    name : String;
    image : String;
}