using Student from '../db/schema';

service myservice{
    entity student  @(restrict:[
        {
            grant: ['READ','Create'],
            to : 'Trainee'
        },
        {
            grant: ['*'],
            to : 'Manager'
        }
    ])
    as projection on Student;
}