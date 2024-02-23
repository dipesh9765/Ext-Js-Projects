/**
 * @class Explorer.view.main.ExplorerController
 * @extends Ext.app.ViewController
 * @alias controller.explorer
 *
 * This controller manages the behavior of the Explorer view.
 */
Ext.define('Explorer.view.main.ExplorerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.explorer',

    /**
     * @inheritdoc
     */
    init: function () {
        this.view = this.getView();
    },

    /**
     * Displays a toast message.
     * @param {String} s The message to display.
     */
    showToast: function (s) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideDUration: 200,
            maxWidth: 400
        });
    },

    /**
    * Gets the selected node.
    * @returns {Ext.data.TreeModel} The selected node.
    */
    getSelectedNode: function () {
        return this.view.getSelection();
    },


    /**
     * Expands all nodes in the tree view.
     */
    expandAllNodes: function () {
        this.getView().expandAll();
    },

    /**
   * Expands the selected node in the tree view if it is not a leaf node.
   */
    expandSelectedNode: function () {
        let LSelectedEl = this.getSelectedNode()[0];
        if (LSelectedEl && !LSelectedEl.isLeaf()) {
            LSelectedEl.expand();
        }
    },

    /**
    * Collapses the selected node in the tree view if it is not a leaf node.
    */
    collapseSelectedNode: function () {
        let LSelectedEl = this.getSelectedNode()[0];
        if (LSelectedEl && !LSelectedEl.isLeaf()) {
            LSelectedEl.collapse();
        }

    },

    /**
     * Collapses all nodes in the tree view.
     */
    collapseAllNodes: function () {
        this.getView().collapseAll()
    },

    /**
     * Adds a new file to the tree view.
     */
    addFile: function () {
        this.pvtDisplayAddingWindow('File');
    },

    /**
     * Adds a new folder to the tree view.
    */
    addFolder: function () {
        this.pvtDisplayAddingWindow('Folder');
    },

    /**
     * @param {String} p_strFileType type of file (File or Folder) to add
     * create the object of the view.popup class and display it
     */
    pvtDisplayAddingWindow(p_strFileType) {
        this.getViewModel().set('title', p_strFileType);
        Ext.create('view.popup').show();
    },

    /**
     * Refreshes the data store by reloading the page.
     */
    refreshStoreData: function () {
        console.log(this.view.getStore());
        console.log(Ext.getStore('dataStore').reload());
        // this.getView().getStore().reload();
        // this.reloadTree(this.view.getStore().getRootNode());
        // window.location.reload();
    },


    /**
    * Deletes the selected files from the tree view after confirmation.
    */
    deleteSelectedFiles: function () {
        let LSelectedFile = this.getSelectedNode();
        if (LSelectedFile.length === 0) return;

        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete this item?', function (p_boolChoice) {
            if (p_boolChoice === 'yes') {
                LSelectedFile.forEach(function (LFile) {
                    let LParentNode = LFile.parentNode;
                    LParentNode.removeChild(LFile);
                });
                this.showToast('File(s) deleted');
            }
        }, this);
    },

    /**
    * Moves the selected file up or down in the tree view.
    * @param {String} p_strDirection The direction to move the file ('up' or 'down').
    */
    pvtMoveFile: function (p_strDirection) {
        let LSelectedNode = this.getSelectedNode()[0];
        if (!LSelectedNode) return;

        let LParentNode = LSelectedNode.parentNode;
        let LIndex = LParentNode.indexOf(LSelectedNode);
        let LTargetIndex = p_strDirection === 'up' ? LIndex - 1 : LIndex + 2;
        if (p_strDirection === 'up' && LIndex > 0 || p_strDirection === 'down' && LIndex < LParentNode.childNodes.length - 1) {
            LParentNode.insertChild(LTargetIndex, LSelectedNode);
        }
    },

    /**
    * Moves the selected file up in the tree view.
    */
    moveFileUp: function () {
        this.pvtMoveFile('up');
    },

    /**
    * Moves the selected file down in the tree view.
    */
    moveFileDown: function () {

        this.pvtMoveFile('down');
    },

    /**
    * Displays the custom context menu at the specified position.
    * @param {Object} p_objView The view object.
    * @param {Object[]} p_arrRecord The records associated with the context menu.
    * @param {Object} p_varItem The menu item.
    * @param {Number} p_intIndex The index of the item.
    * @param {Object} p_evt The event object.
    */
    createCustomContextMenu: function (p_objView, p_arrRecord, p_varItem, p_intIndex, p_evt) {
        p_evt.stopEvent();
        let Lmenu = Ext.create('view.contextmenu');
        Lmenu.showAt(p_evt.getXY());
    },

    /**
     * Validates whether a drop operation is allowed.
     * @param {Object} p_varNode The target node.
     * @param {Object[]} p_arrData The data to be dropped.
     * @param {Object} p_objOverModel The model being dropped onto.
     * @param {String} dropPosition The position of the drop.
     * @param {Object} dropHandlers The drop handlers.
     * @param {Object} eOpts The event options.
     * @returns {Boolean} True if the drop is allowed, otherwise false.
     */
    validateBeforeDrop: function (p_varNode, p_arrData, p_objOverModel, dropPosition, dropHandlers, eOpts) {
        let LRequiredRecord = p_arrData.records[0];
        let LFileName = LRequiredRecord.get('fileName');
        let LFileType = LRequiredRecord.get('fType');
        const LBoolIsLeaf = p_objOverModel.isLeaf();

        if (!p_objOverModel) { return false; }

        if (!LBoolIsLeaf) {
            return this.pvtAreNoDuplicates(p_objOverModel, LFileType, LFileName);
        } else if (p_objOverModel.parentNode) {
            return this.pvtAreNoDuplicates(p_objOverModel.parentNode, LFileType, LFileName);
        }
        return true;
    },

    /**
     * Checks if there are duplicate files in a folder.
     * @param {Object} p_objParentNode The parent node.
     * @param {String} p_strFileType The type of the file.
     * @param {String} p_strFileName The name of the file.
     * @returns {Boolean} True if no duplicates are found, otherwise false.
     */
    pvtAreNoDuplicates: function (p_objParentNode, p_strFileType, p_strFileName) {

        let LBoolIsDuplicate = p_objParentNode.childNodes.some(function (childNode) {
            return childNode.get('fileName') === p_strFileName && childNode.get('fType') === p_strFileType;
        });

        if (LBoolIsDuplicate) {
            Ext.Msg.alert('Error', 'File must be unique within the folder: ' + p_strFileName);
        }

        return !LBoolIsDuplicate;
    },

    /**
    * GCopiedContent: An array to store copied nodes for later pasting.
    * @type {Array}
    */
    GCopiedContent: [],


    /**
     * Copies selected files.
     */
    copyFiles: function () {
        let LSelectedNode = this.getSelectedNode();

        // Copy selected nodes and store them in GCopiedContent array
        this.GCopiedContent = LSelectedNode.map(function (LFile) {
            return LFile.copy(null, null, true);
        });

        // Show toast message indicating successful copy
        this.showToast('Copied!');
    },


    /**
     * Pastes copied files to the selected node.
     */
    pasteFiles: function () {
        // Check if any nodes are copied
        if (this.GCopiedContent.length === 0) return;

        let LSelectedNode = this.getSelectedNode()[0];

        if (!LSelectedNode) return;

        let LAppendNode = LSelectedNode.isLeaf() ? LSelectedNode.parentNode : LSelectedNode;

        // Paste copied nodes to the selected node
        this.GCopiedContent.forEach(function (copiedNode) {
            if (this.pvtAreNoDuplicates(LAppendNode, copiedNode.get('fType'), copiedNode.get('fileName'))) {
                LAppendNode.appendChild(copiedNode);
            }
        }, this);

        // Show toast message indicating successful paste
        this.showToast('Pasted!');
    },

    /**
    * Recursive function to iterate through nodes and highlight the ones containing the search text.
    * @param {Object} p_varNode - The current node being iterated.
    * @param {string} p_strSearchText - The search text to match against.
    * @returns {boolean} - True if a match is found, false otherwise.
    */
    pvtIterateNodesForSearching: function (p_varNode, p_strSearchText) {
        if (p_varNode.get('fileName').toLowerCase().includes(p_strSearchText)) {
            p_varNode.data.cls = "search-highlight"; // Apply CSS class for highlighting
            return true;
        }

        if (p_varNode.hasChildNodes()) {
            return p_varNode.childNodes.some(childNode => this.pvtIterateNodesForSearching(childNode, p_strSearchText));
        }
        return false;
    },

    /**
    * Searches for files based on the input text and highlights matching nodes.
    * @param {string} p_strTextInput - The input text to search for.
    * @param {Event} e - The event object.
    */
    searchForFiles: function (p_strTextInput, e) {
        p_strTextInput = p_strTextInput.getValue().toLowerCase();

        let LStoreObj = this.view.getStore();
        if (!LStoreObj) return

        LStoreObj.clearFilter();

        LStoreObj.getRoot().cascadeBy(record => record.removeCls('search-highlight'));

        if (p_strTextInput) {
            LStoreObj.filterBy(record => this.pvtIterateNodesForSearching(record, p_strTextInput));
        }
    },

    /**
    * Creates a new node with the provided properties.
    * @param {string} p_strFileName - The name of the file/folder.
    * @param {boolean} p_boolIsLeafNode - Indicates whether the node is a leaf node (file) or not (folder).
    * @param {string} p_strTitle - The type/title of the node.
    * @returns {Object} - The newly created node.
    */
    pvtCreateNewNode: function (p_strFileName, p_boolIsLeafNode, p_strTitle) {
        return Ext.create('Ext.data.TreeModel', {
            fileName: p_strFileName,
            leaf: p_boolIsLeafNode,
            expanded: true,
            draggable: true,
            fType: p_strTitle,
        });
    },

    /**
    * Shows a toast message indicating the result of adding a file or folder.
    * @param {string} p_strFileName - The name of the file/folder.
    * @param {Object} p_objSelectedNode - The selected node.
     * @param {string} p_strTitle - The type/title of the node.
    * @param {boolean} p_boolIsLeafNode - Indicates whether the node is a leaf node (file) or not (folder).
    */
    showFileOrFolderAddWindow: function (p_strFileName, p_objSelectedNode, p_strTitle, p_boolIsLeafNode) {
        // Check for duplicate nodes
        const LBoolIsDuplicate = p_objSelectedNode.isLeaf() ? this.pvtAreNoDuplicates(p_objSelectedNode.parentNode, p_strTitle, p_strFileName) :
            this.pvtAreNoDuplicates(p_objSelectedNode, p_strTitle, p_strFileName);


        // If node already exist    
        if (!LBoolIsDuplicate) { this.showToast(`${p_strTitle} already exists`); }

        // Error while taking input
        if (!p_objSelectedNode || !p_strFileName) { this.showToast(`Error while adding the ${p_strTitle}`); }

        // new node created
        let LNewChildNode = this.pvtCreateNewNode(p_strFileName, p_boolIsLeafNode, p_strTitle);

        // condition to check where to append the created file
        // if selected node is child then append it to the parent of the selected node
        // if it itself is the folder then append the file/folder to itself
        !p_objSelectedNode.isLeaf() ? p_objSelectedNode.appendChild(LNewChildNode) : p_objSelectedNode.parentNode.appendChild(LNewChildNode);

        this.showToast('New ' + p_strTitle + ' Created');
    },

})