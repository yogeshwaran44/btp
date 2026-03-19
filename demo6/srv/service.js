import cds from '@sap/cds';

export default cds.service.impl(async function (){
    const {Application,Loan} = this.entities;
    this.on("Status",async (req)=>{
        const {status,id}=req.data;
        await UPDATE(Application).set({status}).where({id});
        if(status==='APPROVED') await this.emit("CreateLoan",{id});
        return "Status Updated";
    });
    this.on("CreateLoan",async(req)=>{
        const {id} = req.data;
        const application = await SELECT.one.from(Application).where({id:id});
        if (!application) throw new Error("Application not found");
        await INSERT.into(Loan).entries({
            sanctionedAmount: application.requestedAmount,
            interestRate:10,
            loanStatus:"ACTIVE",
            loanApplication_id:id
        });
    });
});