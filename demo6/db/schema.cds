using { cuid } from '@sap/cds/common';

namespace bank;

entity  LoanApplication {
    key id : Integer;
    applicationDate     : Date;
    requestedAmount     : Decimal;
    status              : String;
    customer            : String;
    account             : Integer;
    loanType            : String;
}

entity Loan : cuid {
    sanctionedAmount:Integer;
    interestRate:Integer;
    loanStatus :String;
    loanApplication : Association to LoanApplication;
}