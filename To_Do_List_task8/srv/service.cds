using {diary} from '../db/schema';

service myservice{
    
    @odata.draft.enabled
    entity to_do_list as projection on diary.List;

    entity mesg as projection on diary.Mesg;
}

annotate myservice.to_do_list with {
    task  @title : '{i18n>Task}';
    description @title : '{i18n>Description}';
    status @title : '{i18n>Status}';
}