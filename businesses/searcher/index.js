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
        var str = "";
        var request = http.request(options,function(response){
            if(response.statusCode == 200){
                response.setEncoding('utf-8');
                response.on('data',function(data){
                    str += data;
                });
                response.on('end',function(){
                    callback(null,str);
                });
            }else{
                callback(new Error('出现错误!'));
            }
        });
        request.end();
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

module.exports = Searcher;