/* global moment */

'use strict';

class DeepAndTime {

    constructor(dataObject) {
        this.$container = undefined;
        this.$container = dataObject["el"];
        this.width = this.$container.width();
        this.height = this.$container.height();
        this.offsetPositionText = 9;
        
    }
    /**
     * @description Отрисовка данных
     * @param {Object} data
     */
    draw(data) {
        let that = this;
        let coordinatesLineTime = "";
        let coordinatesLineDeep = "";
        let coordinatesTextTime = [];
        let coordinatesTextDeep = [];
        let heightMarkerBlock = $(".add").height();
        let xStart = this.width - (this.width / 4);
        this.data = data;
        if (this.canvas !== undefined) {
            this.canvas.remove();
        }
        this.deepAndTimeDataBlock = $("#deepAndTimeData");
        this.$markersBlock = this.$container.children(".markers");
        
        this.canvas = Raphael(this.deepAndTimeDataBlock[0], this.width, this.deepAndTimeDataBlock.height());
        let ratio = (($(".deepAndTimeBlock").height() - heightMarkerBlock) / 120).toFixed(4);
        this.data.forEach(function (item, i, array) {
            let yPosition = parseInt((i) * ratio, 10) - 0.5;
            if (item["dt"] % 10 === 0) {
                coordinatesLineTime += " M " + xStart + " " + yPosition + " L" + that.width + " " + yPosition;
                coordinatesTextTime.push({y: i, text: item["dt"]});
            }
            if (item["deep"] % 100 === 0) {
                coordinatesLineDeep += "M " + 0 + " " + yPosition + " L" + that.width / 4 + " " + yPosition;
                coordinatesTextDeep.push({y: i, text: item["deep"]});
            }
        });
        this.drawTime(coordinatesLineTime, coordinatesTextTime, ratio);
        this.drawDeep(coordinatesLineDeep, coordinatesTextDeep, ratio);
    }
    /**
     * @description Отрисовка отрисовка времени
     * @param {String} lt
     * @param {Array} tt
     * @param {Float} ratio
     */
    drawTime (lt, tt, ratio) {
        let that = this;
        let lineTime = this.canvas.path(lt);
        let xStart = this.width - (this.width / 4);
        lineTime.attr("class", "timeLine");

        tt.forEach(function (item, i, array) {
            let object = that.canvas.text(xStart,
                    (parseInt(item["y"] * ratio, 10) + 0.5) - that.offsetPositionText,
                    moment.unix(parseInt((item["text"]), 10)).format('mm:ss'));
            object.attr('font-size', 16);
            object.attr("class", "timeText");
        });
    }
    /**
     * @description Отрисовка данных по глубине
     * @param {String} ld
     * @param {Array} td
     * @param {Float} ratio
     */
    drawDeep (ld, td, ratio) {
        let that = this;
        let lineDeep = this.canvas.path(ld);
        
        td.forEach(function (item, i, array) {
            let object = that.canvas.text(that.width / 4 ,
                    (parseInt(item["y"] * ratio, 10) + 0.5) - that.offsetPositionText,
                    item["text"]);
            object.attr('font-size', 16);
        });
        
    }
}

