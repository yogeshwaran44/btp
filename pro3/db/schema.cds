using {cuid, managed} from '@sap/cds/common';
namespace mydb;

entity User {
    key id : Integer;
    name : String;
    address : String;
    connection : Association to many Connection on connection.user = $self;
}

entity Computer{
    key id : Integer;
    name : String;
    model : String;
    connection : Association to many Connection on connection.computer=$self;
}

entity Connection{
    key user : Association to User;
    key computer : Association to Computer;
}

entity Order{
    key id: Integer;
    total : Integer;
    customer : String;
    items : Association to many OrderItems on items.order = $self;
}

entity OrderItems {
    key id: Integer;
    name : String;
    price : Integer;
    order : Association to Order;
}

entity Orders{
    key id : Integer;
    items : Composition of many Products on items.order = $self;
}

entity Products{
    key id : Integer;
    order : Association to Orders;
}

entity Parent {
    key id : Integer;
    name : String;
    child : Composition of many Child on child.parent=$self;
}

entity Child {
    key id : Integer;
    name : String;
    parent : Association to Parent;
}

entity Customer{
    key id : Integer;
    name : String;
    profile : composition of one Profile on profile.customer= $self; 
}

entity Profile{
    key id :Integer;
    customer : Association to Customer;
}

entity Hr : managed,cuid{
    key id : Integer;
    name : String;
    gender : String enum {male;female;others};
    customer : Association to Customers on customer.id = customer_ID;
    customer_ID : Integer;
}

entity Customers {
    key id : Integer;
    name : String;
    account : Account_types;
}

type Account_types{
    name : String;
    allowed : many String;
}