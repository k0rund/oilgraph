function mDevice() {
    var model = Backbone.Model.extend({
        initialize: function(options){},
        urlRoot: App.ApiUrl + "/device/changedata"
    });
    return model;
}


