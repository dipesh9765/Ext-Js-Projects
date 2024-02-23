/**
 * @class Explorer.view.main.Main
 * @extends Ext.tree.Panel
 *
 * This class represents the main view of the file explorer application.
 */
Ext.define('Explorer.view.main.Main', {
    extend: 'Ext.tree.Panel',
    controller: 'explorer',
    id: 'expView',
    alias: 'view.treePanel',
    xtype: 'treePanel',
    requires: [
        'Explorer.store.DataStore',
        // 'Ext.grid.filters.Filters',
    ],

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true,
            enableDrag: true,
        },
    },
    viewModel: {
        type: 'main'
    },

    bind: {
        store: '{files}',
        deep : true,
    },

    reference: 'fileExp',
    /**
     * @cfg {Boolean} multiSelect
     * True to enable multi-selection within the tree panel.
     */
    multiSelect: true,


    /**
     * @cfg {Array} columns
     * Specifies the columns configuration for this tree panel.
     */
    columns: [
        {
            xtype: 'treecolumn',
            frame: true,
            bind: {
                text: '{projectName}'
            },
            dataIndex: 'fileName',
            editor: 'textfield',
            width: 500,
            // sortable: true,
            filter: true,
            items: [{
                xtype: 'label',
                itemId: 'file-path',
                bind: {
                    html: '{selectionText}'
                },
                padding: '5 0 5 15',
                style: {
                    fontSize: '12px',
                    itemAlign: 'center',
                    width: '100%'
                },
            }, {
                xtype: 'textfield',
                emptyText: 'Search here...',
                padding: '5 0 5 15',
                width: 150,
                listeners: {
                    change: 'searchForFiles'
                }

            }],
        }],


    selModel: {
        injectCheckBox: 'first',
        mode: 'MULTI',
        type: 'checkboxmodel',
        checkOnly: false,
        checkOnlyText: false
    },
    useArrows: true,

    /**
         * @cfg {Object} tbar
         * Specifies the top toolbar configuration for this panel.
         */
    tbar: {
        reference: 'tbar',
        autoscroll: true,
        style: {
            backgroundColor: '#157fcc',
        },

        layout: {
            type: 'vbox',
        },
        items: [{
            xtype: 'label',

            margin: '5 10 5 10',
            bind: {
                text: '{heading}',
            },
            flex: 1,
            style: {
                fontSize: '20px',
                color: 'white',
                fontWeight: 'bold'
            }
        }, {
            xtype: 'panel',

            margin: '5 10 5 10',
            alignItem: 'left',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1,
                margin: '5 10 5 10',
            },
            items: [{
                xtype: 'button',
                text: 'Expand All',
                handler: 'expandAllNodes',
                tooltip: 'Expand All Nodes (Shift + E)',
                iconCls: "fas fa-expand"
            }, {
                xtype: 'button',
                text: 'Collapse All',
                handler: 'collapseAllNodes',
                tooltip: 'Collapse All Nodes (Shift + C)',
                iconCls: "fas fa-compress-alt"
            }, {
                xtype: 'button',
                text: 'Add',
                menu: [{
                    text: 'New File',
                    handler: 'addFile',
                    tooltip: 'Add New File (Insert)',
                    iconCls: "fa fa-file"
                }, {
                    text: 'New Folder',
                    handler: 'addFolder',
                    tooltip: 'Add New Folder (Ctrl + Shift + F)',
                    iconCls: "fas fa-folder-plus"
                }]
            }, {
                xtype: 'button',
                text: 'Refresh',
                handler: 'refreshStoreData',
                tooltip: 'Refresh Store Data (Shift + R)',
                iconCls: 'fas fa-sync-alt'
            }, {
                xtype: 'button',
                text: 'Delete',
                handler: 'deleteSelectedFiles',
                tooltip: 'Delete Selected Files (Del)',
                iconCls: 'fa fa-trash'
            }, {
                xtype: 'button',
                text: 'Move',
                menu: [{
                    text: 'Move Up',
                    handler: 'moveFileUp',
                    tooltip: 'Move Selected File Up (Shift + U)',
                    iconCls: "fa fa-arrow-up"
                }, {
                    text: 'Move Down',
                    handler: 'moveFileDown',
                    tooltip: 'Move Selected File Down (Shift + D)',
                    iconCls: "fa fa-arrow-down"
                }]
            }]
        }]
    },

    plugins: {
        gridfilters: true
    },

    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
        })
    ],
    /**
     * @cfg {Object} listeners
     * Specifies the listeners for this panel.
     */
    listeners: {
        itemcontextmenu: 'createCustomContextMenu',
        beforedrop: 'validateBeforeDrop',
    },

    /**
   * @cfg {Object} keyMap
   * Specifies the key mappings for this panel.
   */
    keyMap: {
        'Ctrl+C': 'copyFiles',
        'Ctrl+V': 'pasteFiles',
        'Shift+E': 'expandSelectedNode',
        'Shift+C': 'collapseSelectedNode',
        'Ctrl+Shift+F': 'addFolder',
        'Delete': 'deleteSelectedFiles',
        'Shift+R': 'refreshStoreData',
        'Insert': 'addFile',
        'Shift+U': 'moveFileUp',
        'Shift+D': 'moveFileDown',
    },

    // store: {
    //     type: 'datastore',
    // },


});