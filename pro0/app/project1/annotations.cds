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
            },
            
            {
                $Type:'UI.DataField',
                Value:aadhar,
            },
            {
                $Type:'UI.DataField',
                Value:mobile,
            },
            {
                $Type : 'UI.DataField',
                Value: email,
            },
            {
    $Type : 'UI.DataField',
    Value : description,
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
            },

            
                        {
                $Type : 'UI.DataField',
                Value: mobile,
            },
            {
                $Type : 'UI.DataField',
                Value: aadhar,
            },
            {
                $Type : 'UI.DataField',
                Value: email,
            }
,{
    $Type : 'UI.DataField',
    Value : description,
}
    ],
);

annotate service.user with {
    image @UI.IsImageURL;
    // mobile @Common : { Masked:true }
    mobile  @Communication.IsPhoneNumber;
    email @Communication.IsEmailAddress;
    // mobile @UI.Hidden
    aadhar @Common :{Masked:true};
        description @UI.MultiLineText;

};

annotate service.user with {
    id @title : '{@i18n>id}';
    name @title : '{@i18n>name}';
    image @title : '{@i18n>image}';
    mobile @title : '{@i18n>mobile}';
    email @title :'{@i18n>email}';
    aadhar @title:'{@i18n>aadhar}';
    description @title : '{@i18n>description}'
};
