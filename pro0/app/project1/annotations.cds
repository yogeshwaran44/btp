using myservice as service from '../../srv/service';
annotate service.user with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Value : name,
            },
             {
                $Type : 'UI.DataField',
                Value : image,
            }
        ],
    },
    UI.PresentationVariant:{
        MaxItems:1,
        Visualizations:[@UI.LineItem]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : id,
        },
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        
             {
                $Type : 'UI.DataField',
                Value : image,
            }
    ],
);

annotate service.user with {
    image @UI.IsImageURL
};

annotate service.user with {
    id @title : '{@i18n>id}';
    name @title : '{@i18n>name}';
    image @title : '{@i18n>image}';
};
