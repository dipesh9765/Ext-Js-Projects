Ext.define('ExtractApp.store.Personnel', {
    extend: 'Ext.data.Store',
    storeId: 'Personnel',

    alias: 'store.personnel',

    model: 'ExtractApp.model.Personnel',

    // data: { 
    // },
    // data: [], // Initialize the store with an empty array

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});