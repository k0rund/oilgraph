'use strict';

class Config {
    
    /**
     * @constructor
     * @description Создание экземпляра класса
     * @returns {Config}
     */
    constructor() {
        Config.instance = undefined;
    }
    
    /**
     * @static
     * @description Статический метод для создания экземпляра класса, если экземпляра не создан.
     * @returns {Config}
     */
    static getInstance() {
        if (Config.instance !== undefined) {
            return Config.instance;
        } else {
            Config.instance =  new Config();
        }
        return Config.instance;
    }

    /**
     * @description Установка URL для API
     * @param {String} url 
     */
    set apiUrl(url) {
        this.url = url;
    }
  
    /**
     * @description Геттер установки значения URL
     * @returns {String}
     */
    get apiUrl () {
        return this.url;
    }
    
    /**
     * @description Установка высоты блока с маркерами
     * @param {Int} height 
     */
    set heightBlockMarkers (height) {
        this.heightBlockMarkersValue = height;
    }
    
    /**
     * @description Получение высоты блока с маркерами
     * @returns {Int}
     */
    get heightBlockMarkers () {
        return this.heightBlockMarkersValue;
    }
    
    /**
     * @description Установка интревала обновления времени
     * @param {Int} time 
     */
    set updateTime (time) {
        this.ut = time;
    }
    /**
     * @description Получение интревала обновления времени
     * @returns {Int}
     */
    get updateTime () {
        return this.ut;
    }
    
    set heightChart (height) {
        this.heightChartValue = height;
    }
    get heightChart () {
        return this.heightChartValue;
    }
    set heightMarkerBlock (height) {
        this.heightMarkerBlockValue = height;
    }
    get heightMarkerBlock () {
        return this.heightMarkerBlockValue;
    }
};