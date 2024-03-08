/**
 * Controller class for the main view of the application.
 * @class ExtractApp.view.main.MainController
 * @extends Ext.app.ViewController
 */
Ext.define('ExtractApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: ['ExtractApp.view.main.Utility.SplitData'],

    /**
     * @public
     * Retrieves text from the clipboard, splits it based on specified splitters,
     * and generates formatted data for display in a grid.
     */
    GetPastedCode: function () {
        // let LGridPreview = this.lookupReference("id-gridview");
        // if (LGridPreview) return;
        navigator.clipboard.read().then(items => {
            items[0].getType("text/html").then(blob => {
                blob.text().then(text => {
                    console.log(text);
                    document.write(text)
                });
            });
        });


        // navigator.clipboard.readText().then(p_strClipText => {
        //     let LSplitters = ["paragraph", "division", "bullet", "html"];
        //     const GDataArray = ExtractApp.view.main.Utility.SplitData.SplitDataUsingInputFormatters(p_strClipText, LSplitters);
        //     let LStoreData = this.pvtMakeDataForStore(GDataArray);

        //     this.pvtGenerateGrid(LStoreData);
        // }).catch(err => console.error(err))
    },

    /**
     * @public
     * Adds the selected option to the store.
     * @param {Object} p_objCombo The combo box component.
     * @param {Object} p_arrRecord The selected record.
     */
    AddSelectedOptionToStore: (p_objCombo, p_arrRecord) => {
        let LMainGrid = p_objCombo.up('gridpanel');
        while (LMainGrid && !LMainGrid.isXType('gridpanel')) {
            LMainGrid = LMainGrid.up('gridpanel');
        }

        if (LMainGrid) {
            const LSelectionModel = LMainGrid.getSelectionModel();
            const LRecordIndex = LMainGrid.getStore().indexOf(p_objCombo.getWidgetRecord());
            LSelectionModel.select(LRecordIndex);
            const LSelectedRecord = LSelectionModel.getSelection()[0];
            LSelectedRecord.set('mode', p_arrRecord.get('id'));
        } else {
            console.error('Main grid not found.');
        }
    },

    /**
     * @public
     * Generates JSON data based on the data in the grid store and updates the view model.
     */
    GenerateJsonHandle: function () {
        // get store
        const LCurrentStore = Ext.getStore('Personnel');
        const LDataItems = LCurrentStore.getData().items;

        let LJsonObjectsArr = [];
        let LCurrentObject = {};

        // iterate via dataItems 
        for (let LItemObj of LDataItems) {
            const LCurrentMode = LItemObj.get('mode');
            const LCurrentData = LItemObj.get('data');

            if (LCurrentMode === 'desc') {
                LCurrentObject.description = (LCurrentObject.description || '') + LCurrentData + ' ';
            }
            // default mode is name
            else {
                if (Object.keys(LCurrentObject).length !== 0) {
                    LJsonObjectsArr.push(LCurrentObject);
                    LCurrentObject = {};
                }
                LCurrentObject.name = LCurrentData;
            }
        }


        if (Object.keys(LCurrentObject).length !== 0) {
            LJsonObjectsArr.push(LCurrentObject);
        }

        const LJsonGenerated = JSON.stringify(LJsonObjectsArr, null, 2);

        // Update jsonData in view model
        var LCurrentViewModel = this.getViewModel();
        if (LCurrentViewModel) {
            LCurrentViewModel.set('JData', LJsonGenerated);
        }

        // destroy grid
        this.CancelJsonGeneration();
        // generate display area
        this.pvtGenerateDisplayArea();
    },

    /**
     * @public
     * Cancels the generation of JSON data.
     */
    CancelJsonGeneration: function () {
        this.lookupReference("id-gridview").destroy()
    },

    /**
     * @public
     * Resets the view.
     */
    ResetView: function () {
        this.lookupReference('id-display-content').destroy()
    },

    /**
     * @public
     * Sets the Default value of the combobox before Rendering it .
     * @param {Object} p_objCombobox The Combobox Item
     */
    SelectTheDefaultOptionHandle: function (p_objCombobox) {
        var LDefaultValue = p_objCombobox.defaultValue;

        // Set the default value
        p_objCombobox.setValue(LDefaultValue);
    },

    /**
     * @private
     * Generates the display area.
     */
    pvtGenerateDisplayArea: function () {
        let LDisplayArea = Ext.create('view.displayArea');
        this.pvtAppendItemToContainer(LDisplayArea)
    },

    /**
     * @private
     * Generates the grid and updates its store data.
     * @param {Object[]} p_objFormattedData An array of formatted data objects.
     */
    pvtGenerateGrid: function (p_objFormattedData) {
        let LGridComponent = Ext.create("view.gridView");
        this.pvtUpdateStoreData(p_objFormattedData);
        this.pvtAppendItemToContainer(LGridComponent)
    },

    /**
     * @private
     * Appends an item to the container.
     * @param {Object} p_objItem The item to append.
     */
    pvtAppendItemToContainer(p_objItem) {
        let LShowContainer = this.lookupReference('show-container');

        try {
            LShowContainer.removeAll();
            LShowContainer.add(p_objItem);
        } catch (err) {
            this.CancelJsonGeneration()
        }
    },

    /**
     * @private
     * Formats data for the store.
     * @param {string[]} p_arrData An array of data strings.
     * @returns {Object[]} An array of formatted data objects.
     */
    pvtMakeDataForStore: function (p_arrData) {
        return p_arrData.map(item => ({ data: item }));
    },

    /**
     * @private
     * Updates the store data with the provided array of data objects.
     * @param {Object[]} p_arrData An array of data objects.
     */
    pvtUpdateStoreData: function (p_arrData) {
        var LCurrentStore = Ext.getStore('Personnel');
        if (LCurrentStore) {
            LCurrentStore.removeAll();
            LCurrentStore.loadData(p_arrData);
        } else {
            console.error('Store "datastore" not found.');
        }
    },
});