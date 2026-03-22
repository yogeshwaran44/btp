using management as db from '../db/schema';

service myservice {

    entity vehicle as projection on db.Vehicles{
        vehicle_id
    };
    entity dealer as projection on db.Dealers;
    entity order as projection on db.Orders;
    entity state as projection on db.State{
        name
    };
    entity user as projection on db.User;
    entity log as projection on db.Log;

    
}