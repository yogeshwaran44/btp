using {cuid} from '@sap/cds/common';

namespace demo;

entity Books : cuid{
    title : String;
    genre : Genere;
    descr : String;
    author : Association to Author;
}

entity Author : cuid{
    name : String;
    books : Association to many Books on books.author = $self;
}

type Genere : String enum{
    Mystery; Fiction; Drama;
}