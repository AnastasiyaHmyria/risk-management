
// Import the cds facade object (https://cap.cloud.sap/docs/node.js/cds-facade)
const cds = require('@sap/cds');
const { log, Console } = require('console');

// The service implementation with all service handlers
module.exports = cds.service.impl(async function() {

    // Define constants for the Risk and BusinessPartner entities from the risk-service.cds file
    const { Risks, BusinessPartners, Items} = this.entities;



    // This handler will be executed directly AFTER a READ operation on RISKS
    // With this we can loop through the received data set and manipulate the single risk entries
    this.after("READ", Risks, (data) => {
        // Convert to array, if it's only a single risk, so that the code won't break here
        const risks = Array.isArray(data) ? data : [data];

        // Looping through the array of risks to set the virtual field 'criticality' that you defined in the schema
        risks.forEach((risk) => {
            if( risk.impact >= 100000) {
                risk.criticality = 1;
            } else {
                risk.criticality = 2;
            }

            // set criticality for priority
            switch (risk.prio_code) {
                case 'H':
                    risk.PrioCriticality = 1;
                    break;
                case 'M':
                    risk.PrioCriticality = 2;
                    break;
                case 'L':
                    risk.PrioCriticality = 3;
                    break;
                default:
                    break;
            }

        })
    })
    
    this.on("addItem", async (req) => {
        const { ID, title, descr, quantity } = req.data;

          await cds.db.run(INSERT.into(Items).entries({
            ID,
            title,
            descr,
            quantity
          }));
    });
    this.before("addItem", async (req) => {
        const {quantity} = req.data;
        if(quantity>100){
        req.error(400,"Quantity exceeds 100");
    }
    });

    this.on("getItem", async (req) => {
        return cds.db.run(SELECT('*').from(Items).where({quantity:req.data.quantity}))
    });

    this.on("READ",Risks, (req)=>{
        console.log('1')
    })
  });
