using API_INTELLIGENTPRODUCTPROPOSAL_SRV as api from './external/API_INTELLIGENTPRODUCTPROPOSAL_SRV';
using mydb from '../db/schema';

service myservice{

    entity ext as projection on api.A_SalesDocumentProposalItem{
        key SalesOrganization,
        key DistributionChannel,
        key OrganizationDivision,
        key SoldToParty,
        key Product,
        SalesDocumentType,
        OrderQuantity,
        OrderQuantityUnit
    };
    annotate ext with @cds.persistence.table;

    entity realtion as projection on mydb.realtion;
    
}