Ext.define('Explorer.store.DataStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Explorer.model.DataModel',

    alias: 'store.datastore',
    storeId: 'dataStore',

    root: {
        fileName: 'MyApp',
        fType: 'Folder',
        expanded: true,
        draggable: true,
        children: [{
            fileName: 'app',
            expanded: true,
            fType: 'Folder',
            children: [{
                fileName: 'model',
                expanded: true,
                fType: 'Folder',
                draggable: true,
                children: [{
                    fileName: 'Base.js',
                    draggable: true,
                    fType: 'File',
                    leaf: true,
                }, {
                    fileName: 'DataModel.js',
                    draggable: true,
                    fType: 'File',
                    leaf: true,
                }]
            }, {
                fileName: 'store',
                expanded: true,
                fType: 'Folder',
                draggable: true,
                children: [{
                    fileName: 'DataStore.js',
                    draggable: true,
                    fType: 'File',
                    leaf: true,
                }]
            }, {
                fileName: 'view',
                expanded: true,
                fType: 'Folder',
                draggable: true,
                children: [{
                    fileName: 'AddFile.js',
                    draggable: true,
                    fType: 'File',
                    leaf: true,
                }, {
                    fileName: 'List.js',
                    draggable: true,
                    fType: 'File',
                    leaf: true,
                }]
            }, {
                fileName: 'Application.js',
                draggable: true,
                fType: 'File',
                leaf: true,
            }]
        }, {
            fileName: 'index.html',
            leaf: true,
            fType: 'File',
            draggable: true,
        }, {
            fileName: 'app.js',
            fType: 'File',
            draggable: true,
            leaf: true,
        }]
    },

    lazyFill: false,

    // If a leaf node passes the filter, all its ancestors will be filtered in
    filterer: 'bottomup',
    filters: [

    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'root'
        }
    },
    // autoLoad: true,

})