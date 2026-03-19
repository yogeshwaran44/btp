namespace my.bookshop;

entity Books {
  key ID     : Integer;
      title  : String;
      stock  : Integer;
      price  : Decimal(10,2);
      ratio  : Decimal(5,2);
}