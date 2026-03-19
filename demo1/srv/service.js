const cds = require("@sap/cds");

module.exports = class CatService extends cds.ApplicationService{
    init(){
        const {Books} = this.entities;
        this.on('READ',Books,async(req)=>{
            
            //this works
            // const result = await SELECT.from(Books).where({ price:{in:[10,20]}});
            
            
            //it is not working
            //  const result = await SELECT.from(Books).where({ or:{price:{in:[10,20]},stock:{in:[30,40]}}});
            
            
            //this works
            const result = await SELECT.from(Books).where('price in',[10,20],'or stock in',[30,40]);

            return result;
        })
return super.init();
    }
}