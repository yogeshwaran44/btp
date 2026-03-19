using wing from '../db/schema';

service MyService {

    entity Users as projection on wing.User;
}