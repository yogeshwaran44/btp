import cds from '@sap/cds';

export default cds.service.impl(async function(){

    const {user} = this.entities;

    this.on('READ',user,async(req)=>{
        console.log(req);
        // console.dir(req, { depth: null });
        return req.res.write;
    });
});