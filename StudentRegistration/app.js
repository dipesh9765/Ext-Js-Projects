/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'StudentRegistration.Application',

    name: 'StudentRegistration',

    requires: [
        // This will automatically load all classes in the StudentRegistration namespace
        // so that application classes do not need to require each other.
        'StudentRegistration.*'
    ],

    // The name of the initial view to create.
    mainView: 'StudentRegistration.view.main.Main'
});
