/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport). 
 */
Ext.define('ExtractApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    id: 'mainView',

    reference: 'copyController',
    requires: [
        'Ext.plugin.Viewport',

        'ExtractApp.view.main.MainController',
        'ExtractApp.view.main.MainModel',
    ],

    controller: 'main',
    viewModel: 'main',
    scrollable: true,
    ui: 'navigation',

    title: 'Copy Paste Enhancement',
    width: '100%',
    items: [{
        xtype: 'panel',
        items: [{
            xtype: 'button',
            text: 'Paste Here',
            margin: '20 0 20 10 ',
            iconCls: 'fas fa-paste',
            handler: 'GetPastedCode',
            tooltip: 'Click Here to Paste Selected Content',
        }, {
            xtype: 'panel',
            id: 'show-container',
            reference: 'show-container',
            items: []
        }
        ],
    },

    ]
});