import cds from '@sap/cds';

export default cds.service.impl(async function (){

        const {order, vehicle, dealer, state, user, log} = this.entities;

        const api = await cds.connect.to('cordinates');


        this.before("READ",user,async(req)=>{
            const data = await api.send({
            method:"GET",
             path:"/odata/v4/myservice/getLocation(city='chennai')"
            });
            console.log(data);
        });



    //vehicle creation
     
    this.before("CREATE",vehicle,async(req)=>{

        const { model_name, current_price, status, dealer_dealer_id} = req.data;

        if(!model_name) return req.error(400,"model name is required");
        if(current_price==null||current_price<=0) return req.error(400,"current price is not valid");
        if(!['pending','approved','rejected'].includes(status)) return req.error(400,"status invalid");
        if(!dealer_dealer_id) return req.error(400,"dealer is required");
        req.data.user_id = req.user.id;
        const id=req.data.dealer_dealer_id;
        const dealers = await SELECT.one.from(dealer).where({dealer_id:id});
        if(!dealers) return req.error(400,"Dealer not found");
        const state_name = dealers.state_name;
        const state_tax = await SELECT.one.from(state).where({name:state_name});
        if(!state_tax) return req.error(404,"state not found");                    
        const prefix = state_tax.shortform;
        const random = Math.floor(1000+Math.random()*9000);
        req.data.vehicle_id=`${prefix}-${random}`;
        const base = req.data.current_price;
        const tax = state_tax.tax;
        req.data.current_price=base+(base*tax/100);
    });




    // vehicle price update

    this.on('UPDATE',vehicle,async(req,next)=>{
        const vehicle_id = req.params[0].vehicle_id;
        if (!vehicle_id) return;
        const code = vehicle_id.split('-')[0];
        const state_exists = await SELECT.one.from(state).where({ shortform: code });
        if (!state_exists) return req.error(400, "Invalid state code in vehicle ID");
        const { current_price  }=req.data;
         if(current_price==null||current_price<0)return req.error(400,"new price is not valid");
        const vehicle_data = await SELECT.one.from(vehicle).where({vehicle_id});
        if(!vehicle_data) return  req.error(404,"vehicle not found");
        const id=vehicle_data.dealer_dealer_id
        const dealers = await SELECT.one.from(dealer).where({dealer_id:id});
        if (!dealers) return req.error(404, "dealer not found");
         const state_name = dealers.state_name;
        const state_tax = await SELECT.one.from(state).where({name:state_name});
        if(!state_tax)  return req.error(404,"state not found");
        const tax = state_tax.tax;
        const taxed_price=current_price+(current_price*tax/100);
        req.data.old_price = vehicle_data.current_price;
        req.data.current_price = taxed_price
        return next();
    });



    //logging successful api calls

    this.after('*',async(data,req)=>{
        if (req.target.name === 'myservice.log') return;
        await INSERT.into(log).entries({id:cds.utils.uuid(), user_id : req.user.id, time: new Date()});
    });



    //general validation

      this.before("CREATE",order,async(req)=>{

        const { order_id, quantity, vehicle_vehicle_id} = req.data;

        if(!order_id){
            return req.error(400,"order id is required");
        }
        if(quantity==null||quantity<0){
            return req.error(400,"quantity is required");
        }
        if(!vehicle_vehicle_id){
            return req.error(400,"vehicle is required");
        }
        const check = await SELECT.one.from(vehicle).where({vehicle_id:vehicle_vehicle_id });
        if(!check) {
            return req.error(404,"vehicle not found");
        }

    });

   
    this.before("CREATE",dealer,async(req)=>{

        const {dealer_id, dealer_name, location, state_name} = req.data;
        if(!dealer_id){
            return req.error(400,"dealer id is required");
        }
        if(!dealer_name){
            return req.error(400,"dealer name is required");
        }
        if(!location){
            return req.error(400,"location is required");
        }
        if(!state_name){
            return req.error(400,"state is required");
        }
         const check = await SELECT.one.from(state).where({name:state_name });
        if(!check) {
            return req.error(404,"vehicle not found");
        }


    });

    this.before("CREATE",state,async(req)=>{

        const { name, shortform, tax} = req.data;
        if(!name){
            return req.error(400,"name is required");
        }
        if(!shortform){
            return req.error(400,"shortform is required");
        }
        if(tax==null||tax<=0){
            return req.error(400,"tax is required");
        };

    });

    this.before("CREATE",user,async(req)=>{

        const { id, name} = req.data;
        if(!id){
            return req.error(400,"id is required");
        }
        if(!name){
            return req.error(400,"name is required");
        }

    });



    //overriding crud operations

     this.on("CREATE",state,async(req)=>{
        await INSERT.into(state).entries(req.data);
        return "data inserted successfully";
    });
    this.on("UPDATE",state,async(req)=>{
        const name = req.params[0].name;
        const exists = await SELECT.one.from(state).where({ name });
        if(!exists) return req.error(404,"state not found");
        await UPDATE(state).set(req.data).where({name});
        return "data updated successfully";
    });
    this.on("DELETE",state,async(req)=>{
        const name = req.params[0].name;
        const exists = await SELECT.one.from(state).where({ name });
        if(!exists) return req.error(404,"state not found");
        await DELETE.from(state).where({name});
        return "data deleted";
    });

    this.on("CREATE",user,async (req)=>{
        await INSERT.into(user).entries(req.data);
        return "data inserted successfully";
    });
    this.on("READ",user,async(req)=>{
        const read = await SELECT.from(user);
        return read;
    });
    this.on("UPDATE",user,async(req)=>{
        const id = req.params[0].id;
        const exists = await SELECT.one.from(user).where({ id });
        if(!exists) return req.error(404,"user not found");
        await UPDATE(user).set(req.data).where({id});
    });
    this.on("DELETE",user,async(req)=>{
        const id = req.params[0].id;
        const exists = await SELECT.one.from(user).where({id});
        if(!exists) return req.error(404,"user not found");
        await DELETE.from(user).where({id});
    });

    this.on("CREATE",log,async(req)=>{
        await INSERT.into(log).entries(req.data);
        return "data inserted successfully";
    })
    this.on("READ",log,async(req)=>{
        const read = await SELECT.from(log);
        return read;
    });
    this.on("UPDATE",log,async(req)=>{
        const {id} = req.params[0];
        const exists = await SELECT.one.from(log).where({id});
        if(!exists) return req.error(404,"log not found");
        await UPDATE(log).set(req.data).where({id});
        return "data updated successfully";
    });
    this.on("DELETE",log,async (req)=>{
        const id = req.params[0].id;
        const exists = await SELECT.one.from(log).where({id});
        if(!exists)return req.error(404,"log not found");
        await DELETE.from(log).where({id});
        return "log deleted successfully";
    })

    this.on('READ', state,async (req) => {

        const data = await SELECT.from(state);
    if (Array.isArray(data)) {
        return data.map(s => ({ stateId: s.name }));
    }

    return { stateId: data.name };
});

this.on('READ', vehicle,async (req) => {

        const data = await SELECT.from(vehicle);
    if (Array.isArray(data)) {
        return data.map(v => ({ vehicleId: v.vehicle_id }));
    }

    return { vehicleId: data.vehicle_id };
});

});