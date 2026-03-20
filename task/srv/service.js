import cds from '@sap/cds'; 

export default cds.service.impl(async function () {

    const {order, vehicle, dealer, state, user, log} = this.entities;

    this.before("CREATE",order,async(req)=>{

        const { order_id, quantity, vehicle_vehicle_id} = req.data;

        if(!order_id){
            req.error(400,"order id is required");
            return;
        }
        if(quantity==null||quantity<0){
            req.error(400,"quantity is required");
            return;
        }
        if(!vehicle_vehicle_id){
            req.error(400,"vehicle is required");
            return;
        }
        const check = await SELECT.one.from(vehicle).where({vehicle_id:vehicle_vehicle_id });
        if(!check) {
            req.error(404,"vehicle not found");
            return;
        }

    });

   
    this.before("CREATE",dealer,async(req)=>{

        const {dealer_id, dealer_name, location, state_name} = req.data;
        if(!dealer_id){
            req.error(400,"dealer id is required");
            return;
        }
        if(!dealer_name){
            req.error(400,"dealer name is required");
            return;
        }
        if(!location){
            req.error(400,"location is required");
            return;
        }
        if(!state_name){
            req.error(400,"state is required");
            return;
        }
         const check = await SELECT.one.from(state).where({name:state_name });
        if(!check) {
            req.error(404,"vehicle not found");
            return;
        }


    });

    this.before("CREATE",state,async(req)=>{

        const { name, shortform, tax} = req.data;
        if(!name){
            req.error(400,"name is required");
            return;
        }
        if(!shortform){
            req.error(400,"shortform is required");
            return;
        }
        if(tax==null||tax<=0){
            req.error(400,"tax is required");
            return;
        };

    });

    this.before("CREATE",user,async(req)=>{

        const { id, name} = req.data;
        if(!id){
            req.error(400,"id is required");
            return;
        }
        if(!name){
            req.error(400,"name is required");
            return;
        }

    });


    
    this.before("CREATE",vehicle,async(req)=>{


        const { model_name, current_price, status, dealer_dealer_id} = req.data;
        if(!model_name){
            req.error(400,"model name is required");
            return;
        }
        if(current_price==null||current_price<=0){
            req.error(400,"current price is not valid");
            return;
        }
        if(!status){
            req.error(400,"status is required");
            return;
        }
        if(!dealer_dealer_id){
            req.error(400,"dealer is required");
            return;
        }
        req.data.user_id = req.user.id;
        const id=req.data.dealer_dealer_id
        const dealers = await SELECT.one.from(dealer).where({dealer_id:id});
        if(!dealers){
            req.error(400,"Dealer not found");
            return;
        }
        const state_name = dealers.State;
        const state_tax = await SELECT.one.from(state).where({name:state_name});
        if(!state_tax){
            req.error(404,"state not found");
            return;
        }
        const prefix = state_tax.shortform;
        const random = Math.floor(1000+Math.random()*9000);
        req.data.vehicle_id=`${prefix}-${random}`;
        const base = req.data.current_price;
        const tax = state_tax.tax;
        req.data.current_price=base+(base*tax/100);
    });

    // this.on("approveVehicle",async (req)=>{
    //     const {vehicle_id}=req.data;
    //     await UPDATE(vehicle).set({status:"APPROVED"}).where({vehicle_id});
    //     return "vehicle is approved";
    // });

    // this.on("getTotalOrderValue",async (req)=>{
    //     const {vehicle_id} = req.data;
    //     const vehicle1 = await SELECT.one.from(vehicle).where({vehicle_id});
    //     if(!vehicle1) req.error(404,"Vehicle not found");
    //     const orders = await SELECT.from(order).where({vehicle_vehicle_id:vehicle_id});
    //     let result =0;
    //     for(let o of orders)
    //         result+=o.quantity*vehicle1.price;
    //     return result;
    // });


    this.before('UPDATE',vehicle,async(req)=>{
            const { new_price }=req.data;
            if(new_price==null||new_price<0)return req.error(400,"new price is not valid");
    })
    this.on('UPDATE',vehicle,async(req)=>{
        const vehicle_id = req.params[0].vehicle_id;
        const { new_price }=req.data;
        const vehicle_data = await SELECT.one.from(vehicle).where({vehicle_id});
        if(!vehicle_data){
            req.error(404,"vehicle not found");
            return;
        }
        const id=vehicle_data.dealer_dealer_id
        const dealers = await SELECT.one.from(dealer).where({dealer_id:id});
        if (!dealers) return req.error(404, "dealer not found");
         const state_name = dealers.State;
        const state_tax = await SELECT.one.from(state).where({name:state_name});
        if(!state_tax){
            req.error(404,"state not found");
            return;
        }
        const tax = state_tax.tax;
        const taxed_price=new_price+(new_price*tax/100);
        const vehicle_old_price = vehicle_data.current_price;
        const updated_data = {old_price:vehicle_old_price,current_price:taxed_price};
        await UPDATE(vehicle).set(updated_data).where({vehicle_id});
        return "price updated";
    });

    this.before('*',async(req)=>{
        if (req.target.name === 'log') return;
        await INSERT.into(log).entries({id:cds.utils.uuid(), user_id : req.user.id, time: new Date()});
    });


    this.on("CREATE",state,async(req)=>{
        await INSERT.into(state).entries(req.data);
        return "data inserted successfully";
    });
    this.on("READ",state,async(req)=>{
        const read = await SELECT.from(state);
        return read;
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


});