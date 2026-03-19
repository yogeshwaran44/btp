import cds from '@sap/cds';

export default cds.service.impl(async function () {
    const {ext} = this.entities;
    const s4 = await cds.connect.to('API_INTELLIGENTPRODUCTPROPOSAL_SRV');
    this.on("READ",'ext',async(req)=>{
        const d = await s4.run(req.query);
        await UPSERT.into(ext).entries(d);
        return d;
    });
});