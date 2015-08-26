﻿var RevenueForecastNode = (function () {

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
        self.metrics = ko.observableArray([
            new RevenueForecastMetric("demand", "Demand FTE", true),
            new RevenueForecastMetric("supply", "Supply FTE", true),
            new RevenueForecastMetric("gap", "Gap FTE", true)
        ]);

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

        self.isOpened = ko.observable();
        self.isClosed = ko.computed(function () {
            self.isOpened(!self.isOpened());
        });
        self.isLeaf = !self.children.length;

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
    return RevenueForecastNode;
}).call();