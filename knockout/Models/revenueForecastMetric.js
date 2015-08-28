var RevenueForecastMetric = (function () {

    function RevenueForecastMetric(name, caption, visibility) {
        var self = this;
        self.name = name;
        self.caption = caption;
        self.isVisible = ko.observable(visibility || true);
    }

    RevenueForecastMetric.prototype.switchVisibility = function () {
        this.isVisible(!this.isVisible());
    }
    return RevenueForecastMetric;
}).call();