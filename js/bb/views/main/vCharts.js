/* global data, Config, _, Backbone */
'use strict';
function vCharts () {
    var view = Backbone.View.extend({
        initialize: function(options) {
            var that = this;
            this.parentView = options.parent;
            this.config = Config.getInstance();
            this.period = 600;
            this.data = [];
            
            /*this.heightCharts = $("#charts").height();
            this.allData = new (ChartData.allData())();
            this.allData.fetch({
                "success": function (collection, response, options) {
                    that.render();
                },
                "error": function (collection, xhr, options) {

                }
            });*/
            this.render();
        },
        events : {
            
        },
        template : _.template($("#tempCharts").html()),
        
        /**
         * @description Отрисовка шаблона
         */
        render: function (){
            this.$el.html(this.template());

            this.startTime = parseInt((new Date().getTime() / 1000),10) - 2;
            this.$el.height(this.height);
            
            for (let i = 0; i < data.length; i++) {
                for (let j = 61; j > 0; j--) {
                    if (data[i]["dt"] === (this.startTime - j)) {
                        this.data.push(data[i]);
                    }
                } 
            }
            this._a = new Chart({el: $(".chartBlock._one"), titles: ["p1", "p2"], colors: ["blue", "red"], parent: this});
            this._a.draw(this.data);
            this._dt = new DeepAndTime({el: $(".deepAndTimeBlock")});
            this._dt.draw(this.data);
            
            this.update();
            return this;
        },
        update: function () {
            let k = 1;
            let that = this;
            setInterval(function () {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["dt"] === (that.startTime + k)) {
                        that.data.shift();
                        that.data.push(data[i]);
                    }
                }
                k++;
                that._a.draw(that.data);
                that._dt.draw(that.data);
            }, 1000);

        }
    });
    return view;
}
