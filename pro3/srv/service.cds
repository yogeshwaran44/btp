using {mydb} from '../db/schema';

service myservice {
    entity user as projection on mydb.User;
    entity computer as projection on mydb.Computer;
    entity connection as projection on mydb.Connection;
    entity order as projection on mydb.Order;
    entity orderitems as projection on mydb.OrderItems;
    entity orders as projection on mydb.Orders;
    entity products as projection on mydb.Products;
    entity parent as projection on mydb.Parent;
    entity child as projection on mydb.Child;
    entity customer as projection on mydb.Customer;
    entity profile as projection on mydb.Profile;
}