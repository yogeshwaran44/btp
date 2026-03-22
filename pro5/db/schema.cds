/**
 * business flow
 *  
 * manufacturer creates vehicle, manages vehicle status and  sells to dealers
 * dealer places the order 
 * based on dealer state vehicle tax calcualted and price updated
 * dealer can change the price
 * log is just for storing the details of all api calls
 * user is for every user of the website with their roles. but here only for log purpose.
 * 
 */


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
    state_name : String;
    state : Association to State on state.name = state_name;
    parent_dealer : Association to Dealers;
}

entity Orders{
    key order_id : Integer;
    quantity : Integer;
    dealer : Association to Dealers;
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
