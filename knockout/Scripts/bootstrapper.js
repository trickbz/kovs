require.config({

    baseUrl: 'Scripts',
    paths: {
        // app locations


        // frameworks
        'jquery': 'jquery-2.1.4.min',
        'text': 'text',
        'knockout': 'knockout-3.3.0'
    },
    shim: {}
});

// main app module
define(function (require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var domReady = require('domReady');
    //var indexViewModel = require("indexViewModel");

    //domReady(function () {
    //    console.log($.fn.jquery);
    //    ko.applyBindings(new indexViewModel());
    //});
});