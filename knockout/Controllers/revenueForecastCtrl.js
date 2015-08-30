var RevenueForecastCtrl = (function () {
    function RevenueForecastCtrl() { }

    function ProbabilityCategory(from, to, caption, order) {
        this.from = from;
        this.to = to;
        this.caption = caption;
        this.order = order;
    }

    RevenueForecastCtrl.prototype.probabilityCategories = [
        new ProbabilityCategory(90, 99, "90..99%", 1),
        new ProbabilityCategory(80, 89, "80...89%", 2)
    ];

    RevenueForecastCtrl.prototype.getProbabilityCategoryCaption = function (probability) {
        for (var i = 0; i < this.probabilityCategories.length; i++) {
            var category = this.probabilityCategories[i];
            if (probability >= category.from && probability <= category.to) {
                return category.caption;
            }
        }
        return undefined;
    }

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
                name: model.account.name + " " + opportunities[opportunityIndex],
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

    RevenueForecastCtrl.prototype.treeFromFlat = function (flatData) {
        var self = this;
        var nodeRoot = new RevenueForecastNode("Total", 0, []);
        var grouppedByProbCategory = _.groupBy(flatData, function (item) {
            return self.getProbabilityCategoryCaption(item.opportunity.probability);
        });

        for (var keyProbability in grouppedByProbCategory) {

            if (grouppedByProbCategory.hasOwnProperty(keyProbability)) {
                // skip rows with probability value which doesn't fall
                // in probability categories we are not interested in
                if (keyProbability === "undefined") {
                    continue;
                }

                var nodeProbability = new RevenueForecastNode(keyProbability, 1, []);
                nodeRoot.children.push(nodeProbability);
                var groupProbability = grouppedByProbCategory[keyProbability];
                var grouppedByAccount = _.groupBy(groupProbability, function (item) {
                    return item.account.name;
                });

                for (var keyAccount in grouppedByAccount) {
                    if (grouppedByAccount.hasOwnProperty(keyAccount)) {
                        var nodeAccount = new RevenueForecastNode(keyAccount, 2, []);
                        nodeProbability.children.push(nodeAccount);
                        var groupAccount = grouppedByAccount[keyAccount];
                        for (var i = 0; i < groupAccount.length; i++) {
                            var opportunity = groupAccount[i];
                            var nodeOpportunity =
                                new RevenueForecastNode(
                                    opportunity.opportunity.name,
                                    3,
                                    [],
                                    opportunity.data.demand,
                                    opportunity.data.supply,
                                    opportunity.opportunity.id,
                                    opportunity.opportunity.probability
                                );
                            nodeAccount.children.push(nodeOpportunity);
                        }
                        nodeAccount.children = _.sortBy(nodeAccount.children, "caption");
                    }
                }
                nodeProbability.children = _.sortBy(nodeProbability.children, "caption");
            }
            nodeRoot.children = _.sortBy(nodeRoot.children, "caption");
            nodeRoot.children.reverse();
        }
        return [nodeRoot];
    }

    return RevenueForecastCtrl;
}).call();