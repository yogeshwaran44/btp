import cds from '@sap/cds';

export default cds.service.impl(async function(){
    
    const {System} = this.entities;

    this.on("assignLaptop",async (req)=>{
        const {user,lap} = req.data;
        const  exists = await SELECT.one.from(System).where(({user_Id:user,lap_Id:lap}));
        if(exists)return "already assigned";
        await INSERT.into(System).entries({user_Id:user,lap_Id:lap});
        return "Laptop Assigned Successfully";
    })

})