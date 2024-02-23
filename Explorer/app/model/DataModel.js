Ext.define('Explorer.model.DataModel', {
    extend: 'Ext.data.Model',
    alias: 'model.datamodel',

    fields: [{
        name: 'fileName',
        type: 'string'
    }, {
        name: 'fType',
        type: 'string'
    }, {
        name: 'date',
        type: 'string'
    }]
})