function mDevice() {
    var model = Backbone.Model.extend({
        idAttribute:"id",
        initialize: function(options){},
        urlRoot: App.ApiUrl + "/device/changedata"
    });
    return model;
}


