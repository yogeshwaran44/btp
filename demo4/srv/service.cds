using list from '../db/schema';

service MyService {

    entity users as projection on list.User;

}