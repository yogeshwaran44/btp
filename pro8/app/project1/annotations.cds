using myservice  from '../../srv/service';

annotate myservice.user with @(
    UI.SelectionFields: [
        name
    ],
    UI.LineItem: [  
        { Value: id },
        {
            Value: name,
            Label: 'Name',
            
        },{
            Value: marks,
            Label: 'Marks',
            Criticality:criticality 
        }
    ],
    UI.HeaderInfo: {
        TypeName: 'User',
        TypeNamePlural: 'Users',
        Title: { Value: name }
    }
);

annotate myservice.user with {
    name @Common.ValueList: {
        CollectionPath: 'user',
        Parameters: [{
            $Type: 'Common.ValueListParameterInOut',
            LocalDataProperty: name,
            ValueListProperty: 'name'
        }]
    };
};
