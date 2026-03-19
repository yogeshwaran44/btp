using { API_BUSINESS_PARTNER as abp } from './external/API_BUSINESS_PARTNER';
using {mydb} from '../db/schema';

service myservice {

    entity A_AddressEmailAddress as projection on abp.A_AddressEmailAddress;
    entity partner as projection on mydb.Partner;
};