Ext.define('ExtractApp.store.Option', {
    extend: 'Ext.data.Store',
    storeId: 'Option',

    alias: 'store.option',

    // model: 'ExtractApp.model.Personnel',
    fields: ['option', 'id'],
    data: [
        { option: 'Name', id: 'name' },
        { option: 'Description', id: 'desc' }
    ],
    // data: [], // Initialize the store with an empty array

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});