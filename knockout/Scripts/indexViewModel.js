define(function (require) {
    var ko = require('knockout');
    return function viewModel() {
        var self = this;

        function Person(firstName, lastName) {
            this.firstName = ko.observable(firstName);
            this.lastName = ko.observable(lastName);
        }

        self.persons = ko.observableArray([
            new Person('John', 'Lennon'),
            new Person('John', 'Doe'),
            new Person('George', 'Lennonist'),
            new Person('John', 'Govno'),
            new Person('George', 'Pizda'),
        ]);

        self.firstNames = ko.computed(function () {
            ko.utils.arrayMap(self.persons(), function (person) {
                return person.firstName();
            });
        });
    }
});