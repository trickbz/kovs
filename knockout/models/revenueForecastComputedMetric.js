var RevenueForecastComputedMetric = (function () {

    function RevenueForecastComputedMetric(name, caption, values) {
        var self = this;
        self.name = name;
        self.caption = caption;
        self.values = values;
        self.isVisible = ko.observable(true);
    }

    RevenueForecastComputedMetric.prototype.toggleVisibility = function() {
        self.isVisible(!isVisible());
    };

    return RevenueForecastComputedMetric;
}).call();