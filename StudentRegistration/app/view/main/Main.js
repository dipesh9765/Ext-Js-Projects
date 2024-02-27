/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.*/




Ext.define('StudentRegistration.view.main.Main', {
    extend: 'Ext.panel.Panel',

    viewModel: 'main',

    ui: 'navigation',
    header: {
        title: 'Student Registration Form',
        anchor: '100% 50%',
    },
    scrollable: {
        x: false,
    },
    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'center',
        }, // Align items to the center horizontally
        margin: '0 0 10 0', // Add bottom margin for spacing
        items: [
            {
                xtype: 'form-register',
                centered: true // Center the form horizontally
            }
        ]
    }],


});