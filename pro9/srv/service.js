const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){
    this.on('nothing',async(req)=>{
        console.log(req.data);
        return;
    });
});