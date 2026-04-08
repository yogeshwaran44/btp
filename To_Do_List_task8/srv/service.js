const cds = require('@sap/cds');

module.exports=cds.service.impl(async function(){

        const {mesg} = this.entities;
        
        this.on("READ",mesg,async(req)=>{
            const message = cds.i18n.bundle4(req);
            console.log(message);
            return {
                id:1,
                message : message.at('Hello')
            };
        });
});