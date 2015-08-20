/// <reference path="/Scripts/knockout-3.3.0.js" start-page="/index.html" />
ko.components.register("like-widget", {
    viewModel: function (params) {
        var self = this;
        this.chosenValue = params.value;

        this.like = function() {
            self.chosenValue("like");
        };

        this.dislike = function() {
            self.chosenValue("dislike");
        }
    },
    template:
        "<div data-bind='visible: !chosenValue()'>" +
        "   <button data-bind='click: like'>Like it</button>" +
        "   <button data-bind='click: dislike'>Dislike it</button>" +
        "</div>" +
        "<div data-bind='visible: chosenValue()'>" +
        "   You <strong data-bind='text: chosenValue'></strong> it" +
        "</div>"
});