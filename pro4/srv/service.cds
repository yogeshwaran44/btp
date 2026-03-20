using User from '../db/schema';
service myservice{
    entity user as projection on User;
}