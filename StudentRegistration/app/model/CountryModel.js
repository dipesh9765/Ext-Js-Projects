Ext.define('StudentRegistration.model.CountryModel', {
    extend: 'Ext.data.Model',
    entityName: 'Country',
    idProperty: 'name',
    fields: [{
        name: 'name',
        convert: undefined
    }]
});

// proxy: {
//     type: 'ajax',
//     reader: 'json',
//     url: '/KitchenSink/Country'
// }