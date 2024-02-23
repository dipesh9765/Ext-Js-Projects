/**
 * This class is the view model for the Main view of the application.
 * @class ExtractApp.view.main.MainModel
 * @extends Ext.app.ViewModel
 * @alias viewmodel.main
 */
Ext.define('ExtractApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    record: {},

    data: {
        name: 'name',
        JData: '',
    },
    formulas: {
        /**
        * Computes the formatted output HTML from the JSON data.
        * @method getFormattedOutputFromJson
        * @param {Function} get - The get function to access data from the view model.
        * @returns {string} The HTML formatted output from the JSON data.
        */
        getFormattedOutputFromJson: function (get) {
            const LJsonDataStr = get('JData');
            if (!LJsonDataStr) return '';

            const LDataArr = JSON.parse(LJsonDataStr);
            let LDisplayOutputHtmlStr = '';

            for (const LItemObj of LDataArr) {
                let LHtmlComponent = '';
                if (LItemObj.name) {
                    LHtmlComponent += `<h3 class="data-head">Name: ${LItemObj.name}</h3>`;
                }
                if (LItemObj.description) {
                    LHtmlComponent += `<p class="data-body"><b>Description:</b> ${LItemObj.description}</p>`;
                }
                LHtmlComponent += '<span class="diff-line"></span>';
                LDisplayOutputHtmlStr += LHtmlComponent;
            }

            return LDisplayOutputHtmlStr;
        }
    }

});