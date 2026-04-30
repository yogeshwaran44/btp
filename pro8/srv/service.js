const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){
    const {user} = this.entities;
    this.on('create',user,async()=>{
        const data = req.data;
        if(data.marks<18){
            data.criticality=1;
        }else{
            data.criticality=3;
        };
    });
});