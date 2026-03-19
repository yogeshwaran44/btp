using API_INTELLIGENTPRODUCTPROPOSAL_SRV as api from '../srv/external/API_INTELLIGENTPRODUCTPROPOSAL_SRV';

namespace mydb;

entity realtion {
    key id : Integer;
    name : String;
    Product : String;
    document : Association to api.A_SalesDocumentProposalItem on document.Product = $self.Product;
}