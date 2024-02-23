/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ExtractApp.Application',

    name: 'ExtractApp',

    requires: [
        // This will automatically load all classes in the ExtractApp namespace
        // so that application classes do not need to require each other.
        'ExtractApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'ExtractApp.view.main.Main'
});
