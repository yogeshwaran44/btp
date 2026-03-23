const cds = require('@sap/cds');

module.exports =  cds.service.impl(async function(){

    const{user,computer,connection,order,orderitems,orders,products,parent,child,customer,profile} = this.entities;

    this.before('READ',user, async ( req ) => {
        console.log("going to read user entity");
        // console.log(req);
        // console.log(cds);
        console.log(Object.keys(cds));
    });

    // this.on("READ",user,async(req,next)=>{
    //     console.log('------------------------------------------------------------------------------------------');
    //     console.log('reading the user entity');
    //     console.log(req);
    //     return next();
    // });

    // this.after("READ",user,( req )=>{
    //     console.log("after reading the entity");
    //     console.log(req);
    // })
});