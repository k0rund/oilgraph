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
        this.vCharts = dataObject.parent;
        this.titles = undefined;
        this.colors = undefined;
        this.$container = dataObject["el"];
        this.titles = dataObject["titles"];
        this.colors = dataObject["colors"];
        this.width = this.$container.width();
        this.height = this.$container.height();
    }
    
    /**
     * @description Отображение графиков
     * @param {Array} data Массив с данными для отображениями
     */
    draw (data) {
        let that = this;
        this.data = data;
        this.$chartsBlock = this.$container.children(".charts");
        this.$markersBlock = this.$container.children(".markers");
        
        if(this.charts !== undefined) { this.charts.remove(); }
        this.charts = Raphael(this.$chartsBlock[0], this.$chartsBlock.width(), this.$chartsBlock.height());
        
        if(this.markers !== undefined) { this.markers.remove(); }
        this.markers = Raphael(this.$markersBlock[0], this.$markersBlock.width(), this.$markersBlock.height());
        
        this.titles.forEach(function (item, i, array) {
            that.drawLine (item,that.colors[i]);
            that.drawVerticalLine (5);
            that.drawMarkers (item,that.colors[i]);
        });
        
        /*let that = this;
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
        });*/
    }
    drawVerticalLine (count) {
        let val = this.$chartsBlock.width() / count;
        let height = this.$chartsBlock.height();
        let coordinates = "";
        for (let i = 1; i < count; i++) {
            coordinates += "M " + (val * i) + " " + 0 + " L" + (val * i) + " " + height;
        }
        let line = this.charts.path(coordinates);
        line.attr("class", "lineVertical");
        line.attr('stroke-dasharray', "5.5");
    }
    drawLine (name, color) {
        let that = this;
        let path = "";
        let coordinatesLineTime = "";
        let heightMarkerBlock = $(".add").height();
        let ratio = (($(".deepAndTimeBlock").height() - heightMarkerBlock) / 120).toFixed(4);
        let canvas;
        let line;
        this.data.forEach(function (item, i, data) {
            if (i === 0) {
                path += "M " + item[name] + " " + i;
            } else {
                path += " L" + item[name] + " " + i;
            }
            if (item["dt"] % 10 === 0) {
                let yPosition = parseInt((i) * ratio, 10) - 0.5;
                coordinatesLineTime += " M " + 0 + " " + yPosition + " L" + that.width + " " + yPosition;
            }
            if (i === data.length - 1) {
                that.vCharts.vMain.updateValue(name, item[name]);
                that.vCharts.vMain.updateSetValue(name, item["setValue"][name]);
                that.vCharts.vMain.updateRangeValue(name, item["range"][name]);
            }
        });
        canvas = this.charts.path(path);
        canvas.scale(1, (this.$chartsBlock.height() / 120).toFixed(4), 0, 0);
        canvas.attr({stroke: color});
        line = this.charts.path(coordinatesLineTime);
        line.attr("class", "line");
        line.attr('stroke-dasharray', "5.5");
    }
    drawMarkers (name, color) {
        let lastItem = this.data[this.data.length - 1];
        let coordinatesMarker = "";
        let heightMarker = this.$markersBlock.height();
        coordinatesMarker += "M" + lastItem[name] + "," + 0 +
                        " L" + (lastItem[name] - (heightMarker / 2)) + "," + (heightMarker) + " " +
                        (lastItem[name] + (heightMarker / 2)) + "," + (heightMarker) + " z";
        
        let marker = this.markers.path(coordinatesMarker);
        marker.attr({stroke: color, fill: color});
    }

};
