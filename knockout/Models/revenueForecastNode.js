var RevenueForecastNode = (function () {

    function RevenueForecastNode(name, level, children, demand, supply) {
        var self = this;
        self.name = ko.observable(name);
        self.level = ko.observable(level);
        self.demand = ko.observableArray(demand || []);
        self.supply = ko.observableArray(supply || []);
        self.gap = ko.computed(function () {
            var gapValues = [];
            _.forEach(self.demand(), function (item, index) {
                gapValues.push(item - self.supply()[index]);
            });
            return gapValues;
        });

        self.children = ko.observableArray(children);
        self.isVisible = ko.observable(true);
        self.table = ko.computed(function () {
            var resultMetrics = [];
            for (var i = 0; i < self.metrics().length; i++) {
                var metricName = self.metrics()[i].name;
                var metricComptutedValues = [0, 0, 0, 0, 0, 0];
                metricComptutedValues = self.SumRootChidlrenArrays(self, metricComptutedValues, metricName);
                resultMetrics.push({ name: self.metrics()[i].caption, values: metricComptutedValues });
            }
            return resultMetrics;
        });

        self.isExpanded = ko.observable();
        self.isCollapsed = ko.computed(function () {
            return !self.isExpanded();
        });
        self.toggleOpen = function () {
            self.isExpanded(!self.isExpanded());
        }
        self.isLeaf = ko.pureComputed(function () {
            return !self.children().length;
        });
        self.toggleImage = ko.pureComputed(function() {
            return self.isExpanded() ?
                "Images/minus.png" :
                "Images/plus.png";
        });

    }

    RevenueForecastNode.prototype.SumRootChidlrenArrays = function (tree, resultArray, propertyName) {
        if (tree.children().length === 0) {
            return tree[propertyName]();
        }

        for (var i = 0; i < tree.children().length; i++) {
            var child = tree.children()[i];
            for (var j = 0; j < child[propertyName]().length; j++) {
                var demandValue = child[propertyName]()[j];
                resultArray[j] += demandValue;
            }
            this.SumRootChidlrenArrays(child, resultArray, propertyName);
        }
        return resultArray;
    }

    RevenueForecastNode.prototype.metrics = ko.observableArray([
        new RevenueForecastMetric("demand", "Demand FTE", true),
        new RevenueForecastMetric("supply", "Supply FTE", true),
        new RevenueForecastMetric("gap", "Gap FTE", true)
    ]);

    return RevenueForecastNode;
}).call();