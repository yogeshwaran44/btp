namespace mydb;

 entity Partner{
      key AddressID: String;
      key Person : String;
      key OrdinalNumber : Integer;
      IsDefaultEmailAddress : Boolean;
      EmailAddress : String ;
      SearchEmailAddress : String;
      AddressCommunicationRemarkText : String;
}