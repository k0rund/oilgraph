/* global Config, Backbone */

class ChartData {
    static allData() {
        var coll = Backbone.Collection.extend({
            data: null,
            //model: mAdapter(),
            url: function () {
                return Config.getInstance().apiUrl + "/alldata/get/?time=" + (this.time - 2) + "&period=600";
            },
            comparator: function (info) {
                //return parseInt(info.get("id"));
            },
            initialize: function (options) {
                this.time = parseInt((new Date().getTime() / 1000), 10);
                //this.mac = options.mac;
                //this.data = options.end;
            }
        });
        return coll;
    }
}