'use strict';

class Time {
    /**
     * @description Получение времени
     * @returns {String}
     */
    static getTime () {
        let date = new Date();
        let h = Time.correctData(date.getHours());
        let m = Time.correctData(date.getMinutes());
        let s = Time.correctData(date.getSeconds());
        return h + ":" + m +":" + s;
    }
    
    /**
     * @description Получение даты
     * @returns {String}
     */
    static getDate () {
        let date = new Date();
        let d = Time.correctData(date.getDate());
        let m = Time.correctData(date.getMonth() + 1);
        let y = Time.correctData(date.getFullYear());
        return d + "." + m +"." + y;
    }
    
    /**
     * @description Добавление с переди ноля к числу, если оно меньше 9
     * @param {Int} val 
     * @returns {String}
     */
    static correctData (val) {
        if (val >= 0 && val < 10) {
            val = "0" + val; 
        }
        return val;
    }
    
};