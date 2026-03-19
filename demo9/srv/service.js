const cds = require('@sap/cds');


module.exports = cds.service.impl(async function(){
    const { A_AddressEmailAddress } = this.entities;
    const s4 = await cds.connect.to('API_BUSINESS_PARTNER');
    this.on('READ',A_AddressEmailAddress,async(req)=>{
        const er = await s4.run(req.query);
        return er;
    })
}) 