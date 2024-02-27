var shows = Ext.create('Ext.data.Store', {
    fields: ['id', 'show'],
    data: [
        // { id: 0, show: 'Painting' },
        // { id: 1, show: 'Coding' },
        // { id: 2, show: 'Computer' },
        // { id: 3, show: 'Design' },
        // { id: 4, show: 'Travelling' },
        // { id: 5, show: 'BasketBall' }
    ]
});
var store = Ext.create('Ext.data.Store', {
    fields: ['id', 'show'],
    data: [
        { id: 0, show: 'Painting' },
        { id: 1, show: 'Coding' },
        { id: 2, show: 'Computer' },
        { id: 3, show: 'Design' },
        { id: 4, show: 'Travelling' },
        { id: 5, show: 'BasketBall' }
    ]
});
Ext.define('StudentRegistration.view.main.StudentName', {
    extend: 'Ext.form.Panel',
    xtype: 'form-register',

    viewModel: 'main',

    bodyPadding: 10,
    scrollable: true,
    width: '60%',
    height: 'max',

    defaults: {
        margin: '12 2 2 2',
        fontSize: '14px',
        fontWeight: '500'
    },

    fieldDefaults: {
        labelAlign: 'right',
        // labelWidth: 115,
        msgTarget: 'side',
        allowBlank: false,
        layout: 'anchor',
        xtype: 'panel',
        border: true,
        padding: '10 10 10 10'
    },

    items: [
        {
            xtype: 'fieldset',
            title: 'Primary Details',
            layout: 'vbox',
            padding: '20 20 20 20',
            items: [{
                xtype: 'fieldset',
                title: 'Student Name',
                // margin: '0 0 5 0',
                labelAlign: 'top',
                border: false,
                layout: 'hbox',
                width: '100%',

                defaults: {
                    flex: 1,
                    xtype: 'textfield'
                },
                items: [{
                    // xtype: 'textfield',
                    emptyText: 'First Name...',
                    name: 'firstName',
                    bind: '{fName}',
                    padding: '10 10 10 0'
                }, {
                    // xtype: 'textfield',
                    emptyText: 'Middle Name...',
                    name: 'middleName',
                    bind: '{mName}',
                }, {
                    // xtype: 'textfield',
                    emptyText: 'Last Name...',
                    name: 'lastName',
                    bind: '{lName}',
                    padding: '10 0 10 10'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Birthdate',
                    labelAlign: 'top',
                    width: 500,
                    flex: 1
                }, {
                    xtype: 'container',
                    layout: 'vbox',
                    // margin: '0 0 0 10',
                    width: '100%',
                    flex: 1,
                    items: [{
                        xtype: 'label',
                        text: 'Gender',
                        // margin: '0 0 5 0'
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        defaults: {
                            flex: 1
                        },
                        items: [{
                            xtype: 'radiofield',
                            boxLabel: 'Male',
                            name: 'gender',
                            inputValue: 'm',
                            id: 'radio1'
                        }, {
                            xtype: 'radiofield',
                            boxLabel: 'Female',
                            name: 'gender',
                            inputValue: 'f',
                            id: 'radio2'
                        }, {
                            xtype: 'radiofield',
                            boxLabel: 'Others',
                            name: 'gender',
                            inputValue: 'oth',
                            id: 'radio3'
                        }]
                    }]
                }]
            }, {
                fieldLabel: 'Address',
                // margin: '0 0 5 0',
                labelAlign: 'top',
                xtype: 'textareafield',
                grow: true,
                name: 'message',
                width: '100%',
                allowBlank: true
            }, {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                items: [{
                    xtype: 'combobox',
                    emptyText: 'Select Country...',
                    name: 'country',
                    fieldLabel: 'Country',
                    labelAlign: 'top',
                    flex: 1,

                    reference: 'countrys',
                    displayField: 'name',
                    valueField: 'name',
                    publishes: 'value',
                    store: {
                        type: 'countries'
                    }
                }, {
                    xtype: 'combobox',
                    emptyText: 'Specify state...',
                    name: 'state',
                    fieldLabel: 'State',
                    labelAlign: 'top',
                    flex: 1,

                    reference: 'states',
                    displayField: 'state',
                    valueField: 'abbr',
                    queryMode: 'remote',
                    forceSelection: true,
                    publishes: 'value',
                    cls: 'combo-chaining-city',
                    bind: {
                        filters: {
                            property: 'country',
                            value: '{countrys.value}'
                        }
                    },
                    store: {
                        type: 'country-states'
                    }
                }, {
                    xtype: 'combobox',
                    emptyText: 'Specify City...',
                    name: 'city',
                    fieldLabel: 'City',
                    labelAlign: 'top',
                    flex: 1,

                    displayField: 'city',
                    valueField: 'abbr',
                    queryMode: 'remote',
                    forceSelection: true,
                    cls: 'combo-chaining-state',
                    bind: {
                        filters: {
                            property: 'state',
                            value: '{states.value}'
                        }
                    },
                    store: {
                        type: 'states-cities'
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                width: '50%',
                items: [{
                    xtype: 'textfield',
                    width: '70%',
                    emptyText: 'John.doe@example.com',
                    name: 'email',
                    fieldLabel: 'Email',
                    labelAlign: 'top',
                    flex: 1,
                    vtype: 'email'
                }, {
                    xtype: 'textfield',
                    width: '70%',
                    emptyText: '+91-XXXXXXXXXX',
                    name: 'phone',
                    allowBlank: false,
                    fieldLabel: 'Phone',
                    labelAlign: 'top',
                    flex: 1,
                    minLength: 10,
                    maxLength: 11,
                    enforceMaxLength: true,
                    maskRe: /\d/
                }]
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Other Details',
            layout: 'vbox',
            defaultType: 'textfield',
            width: '100%',

            padding: '20 20 20 20',
            fieldDefaults: {
                // margin: '2 5 10 5'
            },
            items: [{
                xtype: 'panel',
                layout: 'hbox',
                width: '100%',
                items: [{
                    xtype: 'tagfield',
                    flex: 1,
                    name: 'course',
                    fieldLabel: 'Courses',
                    labelAlign: 'top',
                    store: store,
                    displayField: 'show',
                    valueField: 'id'
                }, {
                    xtype: 'tagfield',
                    store: shows,
                    flex: 2,
                    fieldLabel: 'Interests',
                    labelAlign: 'top',
                    displayField: 'show',
                    valueField: 'id',
                    queryMode: 'local',
                    filterPickList: true,
                    createNewOnEnter: true,
                    grow: true,
                    allowBlank: true
                }]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                width: '100%',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Optional Subject',
                    defaultType: 'checkboxfield',
                    labelAlign: 'top',
                    flex: 1,
                    items: [{
                        boxLabel: 'Arts',
                        name: 'optionalSubject',
                        inputValue: 'Art',
                        id: 'cbArt'
                    }, {
                        boxLabel: 'Music',
                        name: 'optionalSubject',
                        inputValue: 'Music',
                        id: 'cbMusic'
                    }]
                }, {
                    xtype: 'filefield',
                    name: 'photo',
                    fieldLabel: 'Upload Document',
                    flex: 2,
                    labelWidth: 50,
                    msgTarget: 'side',
                    labelAlign: 'top',
                    allowBlank: false,
                    anchor: '100%',
                    buttonText: '+'
                }]
            }, {
                xtype: 'htmleditor',
                width: '99%',
                fieldLabel: 'Suggestions',
                labelAlign: 'top',
                emptyText: 'Please provide comments (if any)'
            }]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Declaration',
            name: 'declaration_value',

            margin: '20 20 20 20',
            labelAlign: 'top',
            bind: {
                value: "Full Name: {fName} {mName} {lName}"
            }
        }],

    buttons: [{
        text: 'Clear',
        handler: function () {
            var form = this.up('form');
            Ext.Msg.alert('Success', "Want to Clear the Form");
            form.getForm().reset()
        }

    }, {
        text: 'Submit',
        disabled: true,
        formBind: true,
        handler: function () {
            var form = this.up('form');
            if (form.isValid()) {
                form.submit({
                    success: function (form, action) {
                        Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            } else {
                Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
            }
        }
    }]
});