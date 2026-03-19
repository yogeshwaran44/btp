namespace management;

entity Vehicles{
    key vehicle_id : String;
    model_name : String;
    old_price : Integer;
    current_price : Integer;
    status : String;
    user : association to User;
    dealer : association to Dealers;
    order : composition of many Orders on order.vehicle=$self;
}

entity Dealers{ 
    key dealer_id : Integer;
    dealer_name : String;
     location : String;
    State : String;
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