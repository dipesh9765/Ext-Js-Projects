Ext.define('StudentRegistration.store.StateStore', {
    extend: 'Ext.data.Store',

    alias: 'store.country-states',

    model: 'StudentRegistration.model.StateModel',

    data: [{
        abbr: 'mhs',
        state: 'Maharastra',
        country: 'India'
    }, {
        abbr: 'guj',
        state: 'Gujarat',
        country: 'India'
    }, {
        abbr: 'cal',
        state: 'California',
        country: 'USA'
    }, {
        abbr: 'fl',
        state: 'Florida',
        country: 'USA'
    }, {
        abbr: 'brm',
        state: 'Burmingham',
        country: 'UK'
    }, {
        abbr: 'lv',
        state: 'Liverpool',
        country: 'UK'
    }],



    // proxy: {
    //     type: 'json',
    //     reader: 'json',
    //     url: '/KitchenSink/CountryState'
    // }
});