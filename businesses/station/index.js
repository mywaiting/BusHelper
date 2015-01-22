/**
 * Created by root on 15-1-21.
 */
var js2xmlparser = require("js2xmlparser");
var utils = require("../utils");

var StationModel = require('../../db/models/station');

function Station(){
    this.getStationPos = function(){
        console.log("hello");
    };

    this.addStationPos = function(success_cb,fail_cb){
        var param = {name: "体育中心", lat: "40.056878", lng: "116.30815"};
        StationModel.create(param,function(err,station){
            if(err)
               fail_cb(err);
            success_cb(station);
        });
    };

    this.updateStationPos = function(){
        console.log('hello');
    };
    this.deleteStaionPos = function(){
        console.log('hello');
    }
    this.jsonToXml = function(){
        var data = {
            "ToUserName": "<![CDATA[owWqluO0UiXVM0oBIDcDXF-TPYfs]]>",
            "FromUserName": "<![CDATA[CyrilZhao]]>",
            "CreateTime": parseInt((new Date()).getTime() / 1000),
            "MsgType": "<![CDATA[text]]>",
            "Content": "<![CDATA[你好，世界]]>"
        };
        var xml = js2xmlparser("xml", data);
        return utils.xmlFilter(xml);
    };
};
module.exports = Station;