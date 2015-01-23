/**
 * Created by root on 15-1-22.
 */
var url = require("../../db/models/url");
var http = require('http');
var utils = require('../utils');

function Searcher(){};

Searcher.searchStation = function(json,callback){
    if(typeof(json) == 'object' && json.SendLocationInfo.Location_X != null){
        var path = url.baidu.searcherPath;
        path = path.replace('location_X',json.SendLocationInfo.Location_X);
        path = path.replace('location_Y',json.SendLocationInfo.Location_Y);
        var options = {
            hostname :url.baidu.hostname,
            path:path,
            method:'GET'
        };
        utils.requestBaidu(options,callback);
    }else{
        callback(new Error('出现错误!'));
    }
};

Searcher.responseStation = function(req,data){
    var content = "";
    data = JSON.parse(data);
    var results = data.results;
    if(results){
        if(utils.isArray(results)){
            if(results.length > 0){
                for(var key in results){
                    content += results[key].name + ':\n' + results[key].address + '\n';
                }
            }
        }else{
            if(typeof(results) == 'object'){
                content += results.name + ':\n' + results.address + '\n';
            }
        }
    }
    var createTime = new Date().getTime();
    var responseJson = {
        ToUserName: req.body.FromUserName,
        FromUserName: req.body.ToUserName,
        CreateTime: createTime,
        MsgType: 'text',
        Content: content
    };
    var xml = utils.js2xml(responseJson);
    return xml;
};

Searcher.direct = function(json,callback){
    var index = json.Content.indexOf("到");
    if(typeof(json) == 'object' && index > 0 && index < json.Content.length){
       var origin = json.Content.slice(0,index);
       var destination = json.Content.slice(index + 1,json.Content.length);
       var path = url.baidu.directionPath;
        path = path.replace('ORIGIN',origin);
        path = path.replace('DESTINATION',destination);
        var options = {
            hostname :url.baidu.hostname,
            path:path,
            method:'GET'
        };
        utils.requestBaidu(options,callback);
    }else{
       callback(new Error("出现错误!"));
    }
};

module.exports = Searcher;