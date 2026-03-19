using {API_BUSINESS_PARTNER as s4} from './external/API_BUSINESS_PARTNER';

service myservice {
    entity A_AddressEmailAddress as projection on s4.A_AddressEmailAddress;
}