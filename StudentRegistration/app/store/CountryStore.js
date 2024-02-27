Ext.define('StudentRegistration.store.CountryStore', {
    extend: 'Ext.data.Store',

    alias: 'store.countries',

    model: 'StudentRegistration.model.CountryModel',
    data: [
        {
            name: 'India'
        }, {
            name: 'USA'
        }, {
            name: 'UK'
        }
    ],
    // proxy: {
    //     type: 'ajax',
    //     reader: 'json',
    //     url: '/KitchenSink/Country'
    // }
});