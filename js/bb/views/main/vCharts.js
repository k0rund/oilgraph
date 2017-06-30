/* global data, Config, _, Backbone */
'use strict';
function vCharts () {
    var view = Backbone.View.extend({
        initialize: function(options) {
            var that = this;
            this.vMain = options.parent;
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
            let that = this;
            this.startTime = parseInt((new Date().getTime() / 1000),10) - 2;
            this.$el.height(this.height);
            
            for (let i = 0; i < data.length; i++) {
                for (let j = 121; j > 0; j--) {
                    if (data[i]["dt"] === (that.startTime - j)) {
                        that.data.push(data[i]);
                    }
                } 
            }
            that.data.reverse();
            this._a = new Chart({el: $(".chartBlock._one"), titles: ["p1", "p2", "p3"], colors: ["blue", "red", "green"], parent: this});
            this._a.draw(this.data);
            this._b = new Chart({el: $(".chartBlock._two"), titles: ["p4", "p5", "p6", "p7"], colors: ["blue", "red", "green","rgb(226, 225, 37)"], parent: this});
            this._b.draw(this.data);
            this._c = new Chart({el: $(".chartBlock._three"), titles: [ "p8", "p9", "p10", "p11", "p12", "p13"], 
                colors: ["blue", "red", "green","rgb(226, 225, 37)", "rgb(200, 120, 37)","rgb(150, 200, 37)"], parent: this});
            this._c.draw(this.data);
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
                that._b.draw(that.data);
                that._c.draw(that.data);
                that._dt.draw(that.data);
            }, 1000);

        }
    });
    return view;
}
