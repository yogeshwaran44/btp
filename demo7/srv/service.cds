using demo from '../db/schema';

service myservice {
    entity book as projection on demo.Books;
    entity author as projection on demo.Author;
}