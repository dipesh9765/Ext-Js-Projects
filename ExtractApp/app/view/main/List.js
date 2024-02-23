
/**
 * This class represents the main list view for the application.
 * It extends Ext.grid.Panel and displays personnel data.
 * @class ExtractApp.view.main.List
 * @extends Ext.grid.Panel
 * @xtype mainlist
 * @alias view.mainlist
 */
Ext.define('ExtractApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    alias: 'view.mainlist',
    requires: [
        'ExtractApp.store.Personnel'
    ],
    margin: '0 0 15 0',
    padding: '10 10 10 10',
    border: true,

    store: {
        type: 'personnel'
    },

    emptyText: 'No Data to Display',
    emptyCls: 'empty-text',

    columns: [
        {
            text: 'Field Name',
            width: 150,
            xtype: 'widgetcolumn',
            dataIndex: 'mode',

            widget: {
                xtype: 'combo',
                store: {
                    type: 'option'
                },
                displayField: 'option',
                valueField: 'id',
                defaultValue: 'name',
                markDirty: false,
                editable: false,
                listeners: {
                    beforerender: 'SelectTheDefaultOptionHandle',
                    select: 'AddSelectedOptionToStore'
                }
            },
            flex: 1
        },
        {
            text: 'Data',
            dataIndex: 'data',
            flex: 3,
            sortable: false,
            /**
             * @cfg {Function} renderer
             * Function to customize the rendering of data in this column.
             * It encodes HTML entities in the value.
             * @param {String} value The value to be rendered.
             * @return {String} The HTML-encoded value.
             */
            renderer: function (value) {
                return Ext.util.Format.htmlEncode(value); // Encode HTML entities
            }
        }
    ],
});