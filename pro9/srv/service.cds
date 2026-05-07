using {User,Role} from '../db/schema';
service myservice{
    @odata.draft.enabled
    entity user as projection on User actions{
    action nothing(name: String);}
    entity role as projection on Role;

}