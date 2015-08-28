var RevenueForecastCtrl = (function () {
    function RevenueForecastCtrl() { }

    RevenueForecastCtrl.prototype.getJsonMockup = function (monthCount) {
        var accounts = ["Skype", "Allocine", "HP"];
        var opportunities = ["Front End", "Back End", "Automation"];
        var accountIdPrefix = "AccId";
        var opportunityIdPrefix = "OppId";
        monthCount = monthCount || 6;
        var models = [];

        for (var i = 0; i < accounts.length * opportunities.length; i++) {
            var model = {};
            var accountIndex = Math.floor(i / accounts.length);
            var opportunityIndex = i % opportunities.length;
            model.account = {
                id: accountIdPrefix + i,
                name: accounts[accountIndex]
            };
            model.opportunity = {
                id: model.account.id + opportunityIdPrefix + opportunityIndex,
                name: opportunities[opportunityIndex],
                probability: i % 3 ? 85 : 91
            };

            model.data = {
                demand: [],
                supply: []
            };

            for (var j = 0; j < monthCount; j++) {
                model.data.demand[j] = Math.floor((Math.random() * 10) + 1);
                model.data.supply[j] = Math.floor((Math.random() * 10) + 1);
            }
            models.push(model);
        }
        return JSON.stringify(models);
    }

    RevenueForecastCtrl.prototype.getVmTreeMockup = function() {
        return [
            new RevenueForecastNode("Total", 0, [
                new RevenueForecastNode("90...100%", 1,
                    [
                        new RevenueForecastNode("Skype", 2,
                            [
                                new RevenueForecastNode("Skype Front End", 3, [],
                                    [12, 1, 55, 153, 4, 40],
                                    [112, 31, 5, 53, 43, 41]
                                ),
                                new RevenueForecastNode("Skype Back End", 3, [],
                                    [15, 12, 5, 15, 43, 10],
                                    [12, 3, 51, 23, 23, 14]
                                )
                            ],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        ),
                        new RevenueForecastNode("Allocine", 2, [
                                new RevenueForecastNode("Allocine Front End", 3, [],
                                    [11, 2, 5, 6, 7, 10],
                                    [4, 1, 4, 5, 6, 11]
                                ),
                                new RevenueForecastNode("Allocine Back", 3, [],
                                    [6, 6, 3, 7, 2, 3],
                                    [1, 5, 2, 5, 3, 700]
                                )
                        ],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        )
                    ],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ),
                new RevenueForecastNode("80...89%", 1,
                    [
                        new RevenueForecastNode("HP", 2,
                            [
                                new RevenueForecastNode("HP Front End", 3, [],
                                    [1, 3, 12, 5, 6, 7],
                                    [12, 43, 132, 45, 26, 27]
                                )
                            ],
                            [0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0]
                        )
                    ],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                )
            ],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        )];
    }

    return RevenueForecastCtrl;
}).call();