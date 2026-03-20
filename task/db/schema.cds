namespace management;

entity Vehicles{
    key vehicle_id : String;
    model_name : String;
    old_price : Decimal(10,2);
    current_price : Decimal(10,2);
    status : String enum {pending;approved;rejected};
    user : association to User;
    dealer : association to Dealers;
    orders : composition of many Orders on orders.vehicle=$self;
}

entity Dealers{ 
    key dealer_id : Integer;
    dealer_name : String;
    location : String;
    state : Association to State;
}

entity Orders{
    key order_id : Integer;
    quantity : Integer;
    vehicle : Association to Vehicles;
}

entity State{
    key name : String;
    shortform : String;
    tax : Integer;
}

entity User{
    key id : Integer;
    name : String;
}

entity Log{
    key id : UUID;
    user : Association to User;
    time : DateTime;
}