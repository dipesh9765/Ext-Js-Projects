/**
 * @class Explorer.view.main.ContextMenu
 * @extends Ext.menu.Menu
 *
 * This class represents the context menu for the file explorer application.
 */
Ext.define('Explorer.view.main.ContextMenu', {
    extend: 'Ext.menu.Menu',
    /**
     * @cfg {String} alias
     * Alternate name for this class.
     */
    alias: 'view.contextmenu',

    /**
    * @cfg {Array} items
    * Specifies the items configuration for this context menu.
    */
    items: [{
        text: 'Move Up',
        handler: 'moveFileUp',
        iconCls: 'fa fa-arrow-up',
        tooltip: 'Move File Up - Shift + U'
    }, {
        text: 'Move Down',
        handler: 'moveFileDown',
        iconCls: 'fa fa-arrow-down',
        tooltip: 'Move File Up - Shift + D'
    }, {
        text: 'Collapse',
        handler: 'collapseSelectedNode',
        iconCls: 'fas fa-compress-alt',
        tooltip: 'Collapse Selected Folder - Shift + C'
    }, {
        text: 'Expand',
        handler: 'expandSelectedNode',
        iconCls: 'fas fa-expand',
        tooltip: 'Expand Selected Folder - Shift + E'
    }, {
        text: 'Copy',
        handler: 'copyFiles',
        iconCls: 'fas fa-copy',
        tooltip: 'Copy Selected - Ctrl + C'

    }, {
        text: 'Paste',
        handler: 'pasteFiles',
        iconCls: 'fas fa-paste',
        tooltip: 'Paste Selected - Ctrl + V'
    }, {
        text: 'Delete',
        handler: 'deleteSelectedFiles',
        iconCls: 'fas fa-trash',
        tooltip: 'Delete Selected - Delete'
    }],
});