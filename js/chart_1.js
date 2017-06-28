'use strict';

class Chart {
    /**
     * @description Конструктор
     * @param {Object} $el JQuery объект(контейнер), внутри которого бутет происходить рисование
     * @param {Object} canvas Объект - холст созданный библиотекой 
     * @param {type} elName
     * @param {type} data
     * @returns {DeepAndTime}
     */
    constructor($el, canvas, elName, data) {
        this.$el = $el;
        this.chartsName = elName;
        this.data = data;
        this.canvas = canvas;
        this.heightChart = $el.height();
        let strData = "";
        let rectData = "";
        this.showCharts();
    }
    showCharts () {
        if (this.chartsName === undefined){
            console.log("Ошибка");
        }
        let that = this;
        let arr = this.chartsName;
        let color = ["blue", "red"];
        let heightChart = $(".chart").height() - Config.getInstance().heightMarker;
        let line = this.canvas.path("M0 " + (heightChart + 0.5) + " L" + this.$el.width() + " "+ (heightChart + 0.5) +"");
        line.attr({stroke: 'rgba(0, 0, 0, 0.25)'});
        arr.forEach(function (item, i, arr) {
            that.createPatch (item,color[i]);
        });
        
    }
    createPatch (name, color) {
        let coordinatesChart = "";
        let coordinatesMarker = "";
        let that = this;
        let data = this.data;
        let count = data.length;
        let widthMarker = 14;
        let heightChart = $(".chart").height() - Config.getInstance().heightMarker;
        data.forEach(function (item, i, data) {
            if (i === 0) {
                coordinatesChart += "M " + item[name] + " " + i;
            } else {
                coordinatesChart += " L" + item[name] + " " + i;
            }
            if (i === count - 1) {
                coordinatesMarker += "M" + item[name] + "," + (heightChart ) + " L" + (item[name] - (widthMarker / 2)) + "," + (heightChart + widthMarker) + " " + (item[name] + (widthMarker / 2)) + "," + (heightChart + widthMarker) + " z";
            }
            
        });
        let canvas = that.canvas.path(coordinatesChart);
        canvas.scale(1,(($(".chart").height() - Config.getInstance().heightMarker) / 59).toFixed(4), 0, 0);
        canvas.attr({stroke: color});
        
        let marker = that.canvas.path(coordinatesMarker);
        marker.attr({stroke: color});
        marker.attr({fill: color}); 
        /*
        let text = that.canvas.text(100,10,"TEXT");
        text.attr({stroke: color});
        text.attr({fill: color}); 
        */
    }
    /**
     * @description Отображение и скрытие блока настроек
     */
    settings() {
        this.$сontainer.off("click").on("click", {that: this}, function (e) {
            let $settings = e.data["that"].$settings;
            let $parrent = e.data["that"].$parrent;
            if (e.data["that"].$parrent[0]["id"] !== "chartThree") {
                return;
            }
            $settings.toggleClass("show");
            if ($settings.hasClass("show")) {
                $settings.css({
                    top: "0px"
                });
            } else {
                $settings.css({
                    top: -$parrent.height() + "px"
                });
            }
        });
    }
    
    showBorder () {
        
    }
};

