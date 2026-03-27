service myservice{
     function getCoordinates(address : String) returns Location;   
}
type Location {
    name : String;
    latitude  : String;
    longitude : String;
}