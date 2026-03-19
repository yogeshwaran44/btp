import cds from '@sap/cds'

export default cds.service.impl(async function (){

    const {book, author} = this.entities;

    this.on("READ",book,(req,next)=>{
            console.log("book entity called");    
            return next();
    })

    this.on("READ",author,(req,next)=>{
        console.log("author entity called");
        return next();
    })


    this.before("CREATE",book,(req)=>{
        const data = req.data;
        console.log(data);
    });

})