import cds from '@sap/cds';

let off=0;

export default cds.service.impl(async function () {
     const {partner} = this.entities;
     const s4 = await cds.connect.to('API_BUSINESS_PARTNER');
     this.on('READ','A_AddressEmailAddress',async(req)=>{
        const bp = await s4.run(SELECT.from('A_AddressEmailAddress').limit(10,off));
        await UPSERT.into(partner).entries(bp);
        off+=10;
        return `${bp.length} datas stored`;
     });
});