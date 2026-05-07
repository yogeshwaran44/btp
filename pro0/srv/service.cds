using mydb as db from '../db/schema';

service myservice {
    @odata.draft.enabled
    entity user as projection on db.User;
}