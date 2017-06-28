function vData () {
    var view = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        events : {
            
        },
        template : _.template($("#tempData").html()),
        /**
         * @description Отрисовка шаблона
         */
        render: function(){
            this.$el.html(this.template());
            return this;
        },
    });
    return view;
}