/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Explorer.Application',

    name: 'Explorer',

    requires: [
        // This will automatically load all classes in the Explorer namespace
        // so that application classes do not need to require each other.
        'Explorer.*'
    ],

    // The name of the initial view to create.
    mainView: 'Explorer.view.main.Main'
});
