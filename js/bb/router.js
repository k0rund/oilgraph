function Router () {
    var Router = {
        'main': Backbone.Router.extend({
            routes: {

                "main": "main"//,    
            },
  
            "main" : function () { main(); }
        }) 
    };
    return Router;
}