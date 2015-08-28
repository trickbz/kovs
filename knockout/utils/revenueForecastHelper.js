var RevenueForecastHelper = (function () {
    function RevenueForecastHelper() { }

    RevenueForecastHelper.prototype.jsonToVmTree = function (json) {

        // delete later
        json = json || new RevenueForecastCtrl().getJsonMockup();
        var flatData = JSON.parse(json);
        this.addProbabilityCategory(flatData);



        var treeData;
        


        return treeData;

    };

    RevenueForecastHelper.prototype.probabilityRanges = [
        [50, 79],
        [80, 89],
        [90, 99],
        [100, 100],
    ];

    RevenueForecastHelper.prototype.addProbabilityCategory = function (rows) {
        _.forEach(rows, function (row, index, all) {
        });
    }

    return RevenueForecastHelper;
}).call();