using many_to_many as mtm from '../db/schema';

service MyService {

    entity Laptop as projection on mtm.Laptop;
    entity User as projection on mtm.User;
    entity System as projection on mtm.System;

    action assignLaptop(user: Integer, lap: Integer) returns String;

}