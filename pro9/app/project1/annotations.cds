using myservice as service from '../../srv/service';

annotate  service.user with @(
    UI.LineItem:[
        {Value : id, Label : 'id'},
        {$Type:'UI.DataFieldWithUrl' ,Value : name, Label : 'name',Url:'https://google.com'},
        {Value : city, Label : 'city'},
        {$Type:'UI.DataFieldForAction',Action:'myservice.nothing',Label:'nothing',Inline:true}
    ],
    UI.HeaderInfo:{
        TypeName:'user',
        TypeNamePlural:'users',
        Title:{Value:name}
    },
    UI.FieldGroup #gen: {
        Data:[
            {Value:id},
            {Value:name},
            {Value:city}
        ]
    },
    UI.Facets:[
        {   
            $Type:'UI.ReferenceFacet',
            Lable:'Object',
            Target:@UI.FieldGroup#gen
        }
    ]

);

annotate  service.user with {
    name @Common.ValueList:{
        CollectionPath: 'user',
        Parameters:[{
            $Type:'Common.ValueListParameterInOut',
            LocalDataProperty:name,
            ValueListProperty:'name'
        }]
    }
};
