import cds from '@sap/cds';

export default cds.service.impl(async function (){
    const {customer} = this.entities;
    this.on("READ",customer,(req,next)=>{
        
        return next();
    });
});