function vMain () {
    var view = Backbone.View.extend({
        initialize: function() {
            this.render();
            let $header = $("<div/>",{id:"header",class:"flex segoeUI"});
            let $data = $("<div/>",{id:"data",class:"flex"});
            let $charts = $("<div/>",{id:"charts",class:"flex"});
            let $footer = $("<div/>",{id:"footer",class:"flex"});

            this.$el.append($header).append($data).append($charts).append($footer);
            new (vHeader())({'el':$header, parent: this});
            this.viewData = new (vData())({'el':$data, parent: this});
            this.viewCharts = new (vCharts())({'el':$charts, parent: this});
            new (vFooter())({'el':$footer, parent: this});
            
        },
        events : {
            
        },
        template : _.template($("#tempMain").html()),
        
        /**
         * @description Отрисовка шаблона
         */
        render: function(){
            this.$el.html(this.template());
            
            return this;
        },
        updateValue: function (name, value) {
            $(".dataBlock._" + name).find(".currentValue").text(value);
        },
        updateSetValue: function (name, value) {
            $(".dataBlock._" + name).find(".setValue").text(value);
        },
        updateRangeValue: function (name, value) {
            $(".dataBlock._" + name).find(".bottomValue").text(value["min"] + " нг");
            $(".dataBlock._" + name).find(".topValue").text(value["max"] + " вг");
        }
    });
    return view;
}


