Ext.define('StudentRegistration.store.CityStore', {
    extend: 'Ext.data.Store',

    alias: 'store.states-cities',

    model: 'StudentRegistration.model.CityModel',

    data: [{
        abbr: 'st',
        city: 'Surat',
        state: 'Gujarat'
    }, {
        abbr: 'ahm',
        city: 'Ahmedabad',
        state: 'Gujarat'
    }, {
        abbr: 'ngpr',
        city: 'Nagpur',
        state: 'Maharastra'
    }, {
        abbr: 'pne',
        city: 'Pune',
        state: 'Maharastra'
    }, {
        abbr: 'std',
        city: 'Stanford',
        state: 'Liverpool'
    }, {
        abbr: 'mnc',
        city: 'Burkfast',
        state: 'Liverpool'
    }, {
        abbr: 'ln',
        city: 'London',
        state: 'Burmingham'
    }, {
        abbr: 'ox',
        city: 'Oxford',
        state: 'Burmingham'
    }, {
        abbr: 'cfc',
        city: 'Los Angeles',
        state: 'California'
    }, {
        abbr: 'cfc',
        city: 'San Francisco',
        state: 'California'
    }, {
        abbr: 'cfc',
        city: 'San Jose',
        state: 'Florida'
    }, {
        abbr: 'cfc',
        city: 'Florida City',
        state: 'Florida'
    }],


});