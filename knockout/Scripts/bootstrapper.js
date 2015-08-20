require.config({

    baseUrl: '.',
    paths: {
        // app locations
        'view': 'js/views',
        'model': 'js/models',
        'collection': 'js/collections',

        // frameworks
        'jquery': 'Scripts/jquery/dist/jquery',
        'text': '../bower_components/text/text',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

// main app module
define([
	"model/post_model",
	"underscore",
	"js/helpers/utils",
	"collection/postsCollection",
	'text!../templates/posts_table_template.html',
	'view/postsTableView'
], function (
	PostModel,
	_,
	utils,
	PostsCollection,
	PostsTableTemplate,
	PostsTableView) {
    var posts = new PostsCollection();
    posts.fetch({
        success: function (collection, response, options) {
            var compiledPostTableTemplate = _.template(PostsTableTemplate)({ posts: collection.toJSON() });
            PostsTableView.render(compiledPostTableTemplate);
        }
    });
});