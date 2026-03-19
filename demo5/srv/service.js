const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const {Users} = this.entities;
    this.after("READ",Users,async (req)=>console.log(Users))
})