using bank.loan as bank from '../db/schema';

service Myservice{
entity customer as projection on bank.Customer;
entity branch as projection on bank.Branch;
entity account as projection on bank.Account;
entity loantype as projection on bank.LoanType;
entity loanapplication as projection on bank.LoanApplication;
entity document as projection on bank.Document;
entity employee as projection on bank.Employee;
entity loanapproval as projection on bank.LoanApproval;
entity loan as projection on bank.Loan;
entity disbursement as projection on bank.Disbursement;
entity emiscedule as projection on bank.EmiScedule;
entity repayment as projection on bank.Repayment;
entity penalty as projection on bank.Penalty;
entity guarantor as projection on bank.Guarantor;
entity loanguarantor as projection on bank.LoanGuarantor;
entity notification as projection on bank.Notification;
}