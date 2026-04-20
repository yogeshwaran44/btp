using {mydb} from '../db/schema';

service myservice {
    entity user as projection on mydb.User;
    entity laptop as projection on mydb.Laptop;
}