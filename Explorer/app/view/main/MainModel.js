/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Explorer.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'Explorer.model.DataModel',
        'Explorer.store.DataStore'
    ],
    data: {
        heading: "File Manager",
        projectName: "Directory"
    },

    stores: {
        files: {

            root: {
                fileName: 'MfwegyApp',
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
            }
        }
    },
    formulas: {
        selectionText: function (get) {
            var selection = get('fileExp.selection'), path;
            if (selection) {
                path = selection.getPath('fileName');
                path = path.replace(/^\/Root/, '');
                return 'Selected: ' + path;
            } else {
                return 'No node selected';
            }
        }
    },
});