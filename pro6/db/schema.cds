using {cuid,managed} from '@sap/cds/common';

namespace mydb;

entity One{
    key id : Integer;
    name : String;
    three : Association to many Three on three.one = $self;
}

entity Two {
    key id : Integer;
    name : String;
    three : Association to many Three on three.two = $self;
}

entity Three{
    key one : Association to One;
    key two : Association to Two;
}

entity four : cuid, managed{
    name : String;
    gender : String enum {male;female;others};
    address : Address;
    skills : many String;
}

type Address {
    street: String;
    city : String;
}

entity Five {
    key id : Integer;
    name : String;
    seven : composition of many Seven on seven.five = $self;
}
entity Six{
    key id : Integer;
    name : String;
    seven
}
entity Seven{
    five : Association to Five;
    six : Association to Six;
}