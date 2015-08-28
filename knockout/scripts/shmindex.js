
var Shmindex = (function () {

    function Shmindex() {
        
    }

    function FlatNode(accName, accId, oppName, oppId, oppProbability) {
        var self = this;
        self.account = {
            name: accName,
            id: accId
        };
        self.opportunity = {
            name: oppName,
            id: oppId,
            probability: oppProbability
        }
    }

    function TreeNode(caption, level, children, id, probability) {
        var self = this;
        self.caption = caption;
        self.level = level;
        self.children = children || [];
        self.id = id;
        self.probability = probability;
    }

    function ProbabilityCategory(from, to, caption, order) {
        this.from = from;
        this.to = to;
        this.caption = caption;
        this.order = order;
    }

    Shmindex.prototype.probabilityCategories = [
        new ProbabilityCategory(90, 99, "90..99%", 1),
        new ProbabilityCategory(80, 89, "80...89%", 2)
    ];

    Shmindex.prototype.getProbabilityCategoryCaption = function (probability) {
        for (var i = 0; i < this.probabilityCategories.length; i++) {
            var category = this.probabilityCategories[i];
            if (probability >= category.from && probability <= category.to) {
                return category.caption;
            }
        }
        return undefined;
    }

    Shmindex.prototype.flatData = [
        new FlatNode("Skype", "oppId1", "Skype Frontend", "oppId1", 80),
        new FlatNode("Skype", "oppId1", "Skype Backend", "oppId1", 89),
        new FlatNode("Skype", "oppId1", "Skype Automation", "oppId3", 90),
        new FlatNode("Rockmelt", "oppId2", "Rockmelt Frontend", "oppId4", 80),
        new FlatNode("Rockmelt", "oppId2", "Rockmelt Backend", "oppId5", 80),
        new FlatNode("Invisible!", "oppId3", "Invisible command!", "oppId6", 99),
        new FlatNode("One handred", "oppId4", "One handred 1", "oppId6", 100)
    ];

    Shmindex.prototype.treeFromFlat = function () {
        var self = this;
        var nodeRoot = new TreeNode("Total", 0, []);
        var grouppedByProbCategory = _.groupBy(this.flatData, function (item) {
            return self.getProbabilityCategoryCaption(item.opportunity.probability);
        });

        for (var propProbability in grouppedByProbCategory) {

            if (grouppedByProbCategory.hasOwnProperty(propProbability)) {

                if (propProbability === "undefined") {
                    continue;
                }
                
                var nodeProbability = new TreeNode(propProbability, 1);
                nodeRoot.children.push(nodeProbability);
                var groupProbability = grouppedByProbCategory[propProbability];
                var grouppedByAccount = _.groupBy(groupProbability, function (item) {
                    return item.account.name;
                });

                for (var propAccount in grouppedByAccount) {
                    if (grouppedByAccount.hasOwnProperty(propAccount)) {
                        var nodeAccount = new TreeNode(propAccount, 2);
                        nodeProbability.children.push(nodeAccount);
                        var groupAccount = grouppedByAccount[propAccount];
                        for (var i = 0; i < groupAccount.length; i++) {
                            var opportunity = groupAccount[i];
                            var nodeOpportunity = new TreeNode(
                                opportunity.opportunity.name,
                                3,
                                [],
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
        }
        return nodeRoot;
    }
    return Shmindex;
}).call();