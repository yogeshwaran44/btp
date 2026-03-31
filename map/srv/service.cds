service myservice{
     function getCoordinates(address : String) returns Array of Location;   
}
type Location {
    name : String;
    latitude  : String;
    longitude : String;
}