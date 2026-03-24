using mydb from '../db/schema';

service myservice{
    entity user as projection on mydb.User;
    entity account as projection on mydb.Account;
    entity bridge as projection on mydb.Bridge;

    annotate bridge with @(requires: 'admin');
}
