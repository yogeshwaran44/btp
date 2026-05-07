using myservice as service from '../../srv/service';

annotate  service.user with @(
    UI.SelectionFields:[name],
    UI.LineItem:[
        {Value : id, Label : 'id'},
        {$Type:'UI.DataFieldWithUrl' ,Value : name, Label : 'name',Url:'https://google.com'},
        {Value : city, Label : 'city'},
        {Value:dob,Label:'DOB',Criticality:criticality},
        {$Type:'UI.DataFieldForAction',Action:'service.nothing',Label:'nothing',Inline:true},
        {Value:role.role_name,Label:'role'}
    ],
    UI.HeaderInfo:{
        TypeName:'user',
        TypeNamePlural:'users',
        Title:{Value:name}
    },
    UI.Identification:[
        {$Type:'UI.DataFieldForAction',
         Label:'nothing',
         Action: 'service.nothing'
        }
    ],
    
    UI.FieldGroup #gen: {
        Data:[
            {Value:id,Label:'id'},
            {Value:name,Label:'name'},
            {Value:city,Label:'city'},
            {Value:dob,Label:'DOB'},
            {Value:role.role_name,Label:'Role ID'}
        ]
    },
    UI.Facets:[
        {   
            $Type:'UI.ReferenceFacet',
            Label:'User',
            Target:'@UI.FieldGroup#gen'
        },
        {   
            $Type:'UI.ReferenceFacet',
            Label:'Role',
            Target:'role/@UI.LineItem'
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

annotate  service.user with {
    dob @UI.DateTimeStyle: #short
};

annotate service.role with @(
    UI.LineItem:[
        {Value:id,Label:'ID'},
        {Value:role_name,Label:'ROLE'}
    ],
    UI.HeaderInfo:{
        TypeName:'Role',
        TypeNamePlural:'Roles',
        Title:{Value:id}
    },
    UI.FieldGroup #g2:{
        Data:[
        {Value:id,Label:'ID'},
        {Value:role_name,Label:'ROLE'}
       ]
    },
    UI.Facets:[
        {
            $Type:'UI.ReferenceFacet',
            Target: '@UI.FieldGroup#g2',
            Label:'Role'
        }
    ]
);