var RevenueForecastMetric = (function () {

    function RevenueForecastMetric(name, caption) {
        var self = this;
        self.name = name;
        self.caption = caption;
    }

    RevenueForecastMetric.prototype.switchVisibility = function () {
        this.isVisible(!this.isVisible());
    }
    return RevenueForecastMetric;
}).call();