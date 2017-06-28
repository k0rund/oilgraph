/* global Time, _, Backbone */

function vHeader () {
    var view = Backbone.View.extend({
        initialize: function() {
            this.render();
     
        },
        events : {
            
        },
        template : _.template($("#tempHeader").html()),
        /**
         * @description Отрисовка шаблона
         */
        render: function(){
            this.$el.html(this.template());
            this.updateTimeAndDate();
            return this;
        },
        /**
         * @description Обновление даты и времени
         * @returns {undefined}
         */
        updateTimeAndDate : function () {
            let $time = $(".dateTime .time");
            let $date = $(".dateTime .date");
            
            $time.html(Time.getTime());
            $date.html(Time.getDate());
            
            setInterval(function() { 
                $time.html(Time.getTime());
                $date.html(Time.getDate());
            }, Config.getInstance().updateTime);
        }
    });
    return view;
}