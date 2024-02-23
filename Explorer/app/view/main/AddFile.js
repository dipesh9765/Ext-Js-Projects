/**
 * @class Explorer.view.main.AddFile
 * @extends Ext.window.Window
 * @alias view.popup
 * 
 * This class represents a window for adding a file or folder.
 */
Ext.define('Explorer.view.main.AddFile', {
    extend: 'Ext.window.Window',
    title: 'Add File',
    /**
   * @cfg {String} alias
   * The alias for the view, used to reference the window.
   */
    alias: 'view.popup',
    controller: 'explorer',
    width: 300,
    height: 150,
    layout: 'fit',

    /**
    * @cfg {Object} bind
    * Binds the title property of the window to a dynamic value based on the 'title' property in the ViewModel.
    * In this configuration, the title will be dynamically set to 'Add {title}', where '{title}' is replaced with the value of the 'title' property in the ViewModel.
    * For example, if the ViewModel's 'title' property is set to 'File', the window's title will be 'Add File'.
    */
    bind: {
        title: 'Add {title}',
    },

    floating: true,
    layout: 'fit',

    /**
        * @cfg {Object[]} items
        * The child items to be contained within the window.
        */
    items: [{
        xtype: 'form',
        bodyPadding: 10,
        items: [{
            xtype: 'textfield',
            name: 'fileName',
            bind: {
                fieldLabel: '{title} Name',
            }
        }],
        buttons: [{
            text: 'Add',
            bind: {
                text: 'Add {title}'
            },

            /**
            * @method handler
            * Handler function for the click event of the 'Add' button. 
            */
            handler: function () {
                // Retrieves the reference to the tree panel component with the id 'expView'.
                LViewPanel = Ext.getCmp('expView')

                // Retrieves the input file name from the form field.
                let LInputFileName = this.up('form').getForm().getFieldValues().fileName;

                // Gets the currently selected node from the tree panel.
                let LSelectedNode = LViewPanel.getSelection()[0];
                // If no node is selected, destroys the window and exits.
                if (!LSelectedNode) {
                    this.up('window').destroy();
                    return
                }
                // Retrieves the title from the ViewModel.
                let LTitle = this.lookupViewModel().get('title');

                // Determines if the selected node represents a folder.
                let LBoolIsLeaf = true;
                if (LTitle === 'Folder') {
                    LBoolIsLeaf = false;
                }
                // Creates an instance of the 'controller.explorer'.
                let LControllerObj = Ext.create('controller.explorer');
                // Calls the 'showFileOrFolderAddWindow' method of the controller to add a new file or folder.
                LControllerObj.showFileOrFolderAddWindow(LInputFileName, LSelectedNode, LTitle, LBoolIsLeaf);
                // Destroys the window and the controller instance.
                this.up('window').destroy();
                LControllerObj.destroy();
                LControllerObj = null;
            },

        }]
    }]
});
