service myservice {
    function getLocation(country : String,state: String,district:String,city:String) returns array of Location;
}

type Location {
    name     : String;
    latitude  : Decimal(9,6);
    longitude : Decimal(9,6);
}