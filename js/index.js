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
        let sv = {p1: 250, p2: 400, p3: 480};
        let r = {p1: {min: 0, max: 250}, p2: {min: 0, max: 250}, p3: {min: 0, max: 250}, p4: {min: 34, max: 80}, p5: {min: 90, max: 120}, p6: {min: 150, max: 170},
                p7: {min: 0, max: 250}, p8: {min: 0, max: 250}, p9: {min: 0, max: 250}, p10: {min: 34, max: 80}, p11: {min: 90, max: 120}, p12: {min: 150, max: 170}, p13: {min: 150, max: 170}};
        d[i] = {
            dt: time - i, 
            setValue: sv, 
            range: r, 
            p1: randomInteger(90, 100), 
            p2: randomInteger(110, 125), 
            p3: randomInteger(140, 200),
            p4: randomInteger(50, 80),
            p5: randomInteger(100, 150), 
            p6: randomInteger(160, 200), 
            p7: randomInteger(11, 50), 
            p8: randomInteger(60, 100), 
            p9: randomInteger(120, 135),
            p10: randomInteger(150, 180),
            p11: randomInteger(200, 250), 
            p12: randomInteger(260, 290), 
            p13: randomInteger(300, 310), 
            deep: deep
        };
        deep = deep + 10;
    }
    return d;
}
function updateData(time,deep) {
    let i = 1;
    deep = deep + 10;
    setInterval(function () {
        let sv = {p1: 250, p2: 400, p3: 480};
        let r = {p1: {min: 0, max: 250}, p2: {min: 0, max: 250}, p3: {min: 0, max: 250}, p4: {min: 34, max: 80}, p5: {min: 90, max: 120}, p6: {min: 150, max: 170},
                p7: {min: 0, max: 250}, p8: {min: 0, max: 250}, p9: {min: 0, max: 250}, p10: {min: 34, max: 80}, p11: {min: 90, max: 120}, p12: {min: 150, max: 170}, p13: {min: 150, max: 170}};
        data.push({
            dt: time + i, 
            setValue: sv, 
            range: r, 
            p1: randomInteger(90, 100), 
            p2: randomInteger(110, 125), 
            p3: randomInteger(140, 200),
            p4: randomInteger(50, 80),
            p5: randomInteger(100, 150), 
            p6: randomInteger(160, 200), 
            p7: randomInteger(11, 50), 
            p8: randomInteger(60, 100), 
            p9: randomInteger(120, 135),
            p10: randomInteger(150, 180),
            p11: randomInteger(200, 250), 
            p12: randomInteger(260, 290), 
            p13: randomInteger(300, 310), 
            deep: deep});
        deep += 10;
        i++;
    }, 1000);
}
