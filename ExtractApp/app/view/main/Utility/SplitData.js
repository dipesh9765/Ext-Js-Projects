/**
 * This utility class provides methods for splitting data based on specified parameters.
 * @class ExtractApp.view.main.Utility.SplitData
 * @singleton
 */
Ext.define('ExtractApp.view.main.Utility.SplitData', {
    statics: {
        /**
        * Splits the data into an array of strings based on specified parameters.
        * @param {string} p_strData The data to be split. 
        * @param {string[]} p_arrParams Parameters to specify splitting criteria.
        * If none are passed then newline i.e. ("\r" or "\n") will be considered
        * User can pass Array of string containing criteria such as "newline", "paragraph","division","bullet","comment"
        * @returns {string[]} An array of split data strings.
        */
        SplitDataUsingInputFormatters: function (p_strData, p_arrParams) {
            let result = [p_strData]; // Initialize the result array with the original data
            //check if no array is passed or is an empty array
            if (!p_arrParams || p_arrParams.length == 0)
                result = this.pvtSplitDataBySeparator(result, /\r?\n/);

            else {
                // Iterate through each splitting parameter
                for (const param of p_arrParams) {
                    switch (param) {
                        case "html":
                            result = this.pvtSplitDataByTag(result, /<[^>]*>|<\/>/g)
                            break;
                        case "division":
                            result = this.pvtSplitDataByTag(result, /<div[^>]*>|<\/div>/gi);
                            break;
                        case "bullet":
                            result = this.pvtSplitDataByTag(result, /<li>|<\/li>|<ul>|<\/ul>|<ol>|<\/ol>/ig);
                            break;
                        case "comment":
                            result = this.pvtRemoveComments(result);
                            break;
                        case "paragraph":
                            result = this.pvtSplitDataByTag(result, /\r?\n[\r?\n]*\r?\n/);
                            break;
                        case "newline":
                            result = this.pvtSplitDataBySeparator(result, /\r?\n/);
                        default:
                            break;
                    }
                }
            }

            return result.filter(str => str.trim() !== '').map(LFormattedString => LFormattedString.trim());
        },

        /**
        * Helper function to split data by HTML tag.
        * @private
        * @param {string[]} dataArray The array of data strings to be split.
        * @param {RegExp} tagRegex The regular expression for tag matching.
        * @returns {string[]} An array of split data strings.
        */
        pvtSplitDataByTag: function (dataArray, tagRegex) {
            return dataArray.flatMap(str => str.split(tagRegex).filter(Boolean));
        },

        /**
         * Helper function to split data by separator.
         * @private
         * @param {string[]} dataArray The array of data strings to be split.
         * @param {RegExp} separatorRegex The regular expression for separator matching.
         * @returns {string[]} An array of split data strings.
         */
        pvtSplitDataBySeparator: function (dataArray, separatorRegex) {
            return dataArray.flatMap(str => str.split(separatorRegex));
        },

        /**
         * Helper function to remove comments from the data.
         * @private
         * @param {string[]} dataArray The array of data strings to remove comments from.
         * @returns {string[]} An array of data strings without comments.
         */
        pvtRemoveComments: function (dataArray) {
            const commentRegex = /\/\/[\s\S]*?\n|\/\*[\s\S]*?\*\/|\<!--[\s\S]*--\>/g; // Regex to match both single-line and multi-line comments
            return dataArray.flatMap(str => str.split(commentRegex)); // Remove comments from each string
        },
    }
})