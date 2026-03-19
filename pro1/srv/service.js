const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (){
    const {user,account,bridge}= this.entities;
    this.on('READ',user,async(req,next)=>{
        // console.log(req);
        return next();
    });
});