function MInfo() {
    var model = Backbone.Model.extend({
        idAttribute:"id",
        defaults:{},
        initialize: function(options){}//,
        //urlRoot: App.API_URL + "/info"
    });
    return model;
}   



