var RevenueForecastVm = (function () {

    function RevenueForecastVm() {
        var self = this;
        self.result1 = ko.observableArray(new RevenueForecastCtrl().getData1());
        self.startDate = ko.pureComputed(function () {
            return moment().startOf("quarter").toDate();
        });
        self.endDate = ko.pureComputed(function () {
            return moment().add(1, "quarter").endOf("quarter").toDate();
        });
        self.tableHeaderMonthQuarterArray = ko.pureComputed(function () {
            console.log("tableHeaderMonthQuarterArray");
            var start = moment(self.startDate());
            var end = moment(self.endDate());
            var headers = [];
            for (var currentDate = start, i = 0; currentDate < end; currentDate.add(1, "month"), i++) {
                headers.push(moment(currentDate).format("MMM"));
                if ((i + 1) % 3 === 0) {
                    headers.push("Q" + currentDate.quarter());
                }
            }
            return headers;
        });
    }

    RevenueForecastVm.prototype.sumQuarter = function(array, index) {
        return _.reduce(array.slice(index - 2, index + 1), function(memo, value) {
            return memo + value;
        });
    }

    RevenueForecastVm.prototype.groupItemsCount = function (level, childrenCount) {
        var groupType;
        if (level === 0) return "for " + moment(this.startDate()).format("MMM YYYY") + " - " + moment(this.endDate()).format("MMM YYYY");
        else if (level === 1) groupType = " account(s)";
        else if (level === 2) groupType = " opportunitie(s)";
        else return "";
        return childrenCount + groupType;
    };

    return RevenueForecastVm;
}).call();