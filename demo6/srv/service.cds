using bank from '../db/schema';

service Myservice{
    entity Application as projection on bank.LoanApplication;
    entity Loan as projection on bank.Loan;
    action Status ( status: String, id:Integer) returns String;
}