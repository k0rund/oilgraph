/* global Config */

'use strict';
/**
 * @description Класс для отображения графиков
 */
class Chart {
    
    /**
     * @description Конструктор
     * @param {Object} dataObject Объект с данными
     */
    constructor(dataObject) {
        this.nameContainer = undefined;
        this.titles = undefined;
        this.colors = undefined;
        this.nameContainer = dataObject["id"];
        this.titles = dataObject["titles"];
        this.colors = dataObject["colors"];
        this.width = $("#" + this.nameContainer).width();
        this.height = $("#" + this.nameContainer).height();
    }
    
    /**
     * @description Отображение графиков
     * @param {Array} data Массив с данными для отображениями
     */
    draw (data) {
        let that = this;
        this.data = data;
        if(this.canvas !== undefined) {
            this.canvas.remove();
        }
        this.canvas = Raphael(this.nameContainer, this.width, this.height);
        
        let heightChart = $(".chart").height() - Config.getInstance().heightMarkerBlock;
        let line = this.canvas.path("M0 " + (heightChart + 0.5) + " L" + this.width + " "+ (heightChart + 0.5) +"");
        line.attr({stroke: 'rgba(0, 0, 0, 0.25)'});
        
        this.titles.forEach(function (item, i, array) {
            that.createPatch (item,that.colors[i]);
        });
    }
    
    /**
     * @description Создание path
     * @param {String} name Название (идентификатор) графика
     * @param {String} color Цвет отображения графика.
     */
    createPatch(name, color) {
        let coordinatesChart = "";
        let coordinatesMarker = "";
        let that = this;
        let data = this.data;
        let count = data.length;
        let widthMarker = Config.getInstance().heightMarkerBlock;
        let heightChart = $(".chart").height() - Config.getInstance().heightMarkerBlock;
        data.forEach(function (item, i, data) {
            if (i === 0) {
                coordinatesChart += "M " + item[name] + " " + i;
            } else {
                coordinatesChart += " L" + item[name] + " " + i;
            }
            if (i === count - 1) {
                coordinatesMarker += "M" + item[name] + "," + (heightChart) +
                        " L" + (item[name] - (widthMarker / 2)) + "," + (heightChart + widthMarker) + " " +
                        (item[name] + (widthMarker / 2)) + "," + (heightChart + widthMarker) + " z";
            }

        });
        let canvas = that.canvas.path(coordinatesChart);
        canvas.scale(1, (($(".chart").height() - Config.getInstance().heightMarkerBlock) / 59).toFixed(4), 0, 0);
        canvas.attr({stroke: color});

        let marker = that.canvas.path(coordinatesMarker);
        marker.attr({stroke: color, fill: color});
    }

};
