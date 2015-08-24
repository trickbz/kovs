var RevenueForecastViewModel = (function (_) {
    function RevenueForecastViewModel() { }

    var _transformGrouping = function (group) {
        return _.map(group, function (rows, key) {
            return { name: key, children: rows };
        });
    };

    RevenueForecastViewModel.prototype.getModel = function (rows, keys, reduce, constructor) {
        
        var _infiniteNest = function(parent, keyIndex, childIndex) {

            if (keyIndex === 0) {
                // build initial children arrays by grouping first level
                parent.children = _transformGrouping(_.groupBy(rows, keys[0]));      

                // if we have more keys to traverse, go through every
                // child grouping and nest that.
                if (keyIndex < keys.length) {
                    for (var i = 0; i < parent.children.length; i++) {
                        _infiniteNest(parent.children[i], keyIndex + 1, i);
                    }
                }
            } else {

                // save the position of this specific child in
                // its parent child heirarchy
                parent.index = childIndex;

                if (keyIndex >= keys.length) {

                    // if we have a reduce method provided, reduce the
                    // children
                    if (typeof reduce !== "undefined") {
            
                        parent.value = reduce(parent.children);

                        // remove the original children array, since we've 
                        // reduced it.
                        delete parent.children;
                    } 

                } else {

                    parent.children = _transformGrouping(
                      _.groupBy(parent.children, keys[keyIndex])
                    );

                    for(var m = 0; m < parent.children.length; m++) {
                        _infiniteNest(parent.children[m], keyIndex + 1, m);
                    }
                }
            }

            return parent;
        };

        return _infiniteNest({}, 0);
    };

}
}).call(this);