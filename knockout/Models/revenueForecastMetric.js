var RevenueForecastMetric = (function () {

    function RevenueForecastMetric(name, caption, isVisible) {
        var self = this;
        self.name = name;
        self.caption = caption;
        self.isVisible = ko.observable(isVisible || true);
    }

    RevenueForecastMetric.prototype.switchVisibility = function () {
        this.isVisible(!this.isVisible());
    }
    return RevenueForecastMetric;
}).call();