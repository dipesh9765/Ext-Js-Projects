
Ext.define('StudentRegistration.model.StateModel', {
    extend: 'Ext.data.Model',

    entityName: 'State',
    idProperty: 'state',
    fields: [

        'abbr',
        {
            name: 'state',
            convert: undefined
        },
        'description',
        'country'
    ]
});