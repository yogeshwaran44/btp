namespace diary;

entity List{
    key id : Integer;
    task : localized String;
    description : localized String;
    status : localized String;
}

entity Mesg{
    key id : Integer;
    message : String;
}