/* global Config, Backbone, Router */
'use strict';
var data
$(document).ready(function(){
    let page ="main";
    let router;
    let App = Config.getInstance();
    let time = parseInt((new Date().getTime() / 1000),10);
    let lastItem;
    
    App.apiUrl = "http://192.168.10.18:8888";
    App.heightBlockMarkers = 20;
    App.updateTime = 1000;
    App.heightMarkerBlock = 15;
    
    data = createData(time);
    lastItem = data[data.length - 1];
    updateData(time,lastItem["deep"]);
    
    
    window.location.hash = page;
    router = new (Router()).main();
    Backbone.history.start();
    router.navigate(page, {trigger: true});
});


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function createData(time) {
    let d = [];
    var deep = 10000;
    for (let i = 0; i < 600; i++) {
        d[i] = {dt: time - i, p1: randomInteger(90, 100), p2: randomInteger(110, 125), deep: deep};
        deep = deep + 10;
    }
    return d;
}
function updateData(time,deep) {
    let i = 1;
    deep = deep + 10;
    setInterval(function () {
       data.push({dt: time + i, p1: randomInteger(90, 100), p2: randomInteger(110, 125), deep: deep});
       deep += 10;
       i++;
    }, 1000);
}
