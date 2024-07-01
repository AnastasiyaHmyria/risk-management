
using {riskmanagement as rm} from '../db/schema';

@path: 'service/risk'
service RiskService {
    @cds.redirection.target
    entity Risks       as projection on rm.Risks;
    annotate Risks with @odata.draft.enabled;
    @cds.redirection.target
    entity Mitigations as projection on rm.Mitigations;
    annotate Mitigations with @odata.draft.enabled;

    @readonly entity ListOfRisks1 as projection on rm.ListOfRisks
    annotate ListOfRisks1 with @odata.draft.enabled;

    entity Items as projection on rm.Items;
    annotate Items with @odata.draft.enabled;



    action addItem (title:String,descr:String,quantity:Integer);
    function getItem (quantity:Integer) returns many Items;
    // BusinessPartner will be used later
    //@readonly entity BusinessPartners as projection on rm.BusinessPartners;

}




    // entity Mitigations as projection on rm.Mitigations{ *,
    //     risks: redirected to Risks};
    // annotate Mitigations with @odata.draft.enabled;
    //   @readonly entity ListOfRisks2 as projection on rm.Risks
    // {
    //     ID, title, owner
    // }


    

    