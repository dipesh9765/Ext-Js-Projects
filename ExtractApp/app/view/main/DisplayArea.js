/**
 * This class represents the display area for formatted and JSON data in the application.
 * @class ExtractApp.view.main.DisplayArea
 * @extends Ext.panel.Panel
 * @xtype app-displayArea
 * @alias view.displayArea
 */
Ext.define('ExtractApp.view.main.DisplayArea', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-displayArea',
    alias: 'view.displayArea',

    id: 'id-display-content',
    reference: 'id-display-content',
    maxWidth: '100%',
    items: [
        {
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            id: 'display-area',
            defaults: {
                xtype: 'panel',
                cls: 'display-item',
                height: 550,
                scrollable: true,
                flex: 1,
                maxWidth: 800
            },
            items: [{
                title: 'Formatted Data',
                bind: { html: '{getFormattedOutputFromJson}' },
                margin: '0 30 20 0'
            },
            {
                title: 'JSON Data',
                layout: 'fit',
                items: [{
                    xtype: 'textareafield',
                    cls: 'textarea-readonly-cls',
                    bind: '{JData}',
                    editable: false,
                }],
                margin: '0 0 20 30'
            }]
        },
        {
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                id: 'reset-btn',
                text: 'Reset',
                handler: 'ResetView',
                tooltip: 'Remove and Delete JSON Data',
                margin: '20 0 20 15'
            }]
        }
    ]
});