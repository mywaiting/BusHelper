/**
 * Created by root on 15-1-22.
 */
var url = require("../../db/models/url");
var utils = require("../utils");
var response = require('../response');
var user = require('../user');

function Searcher(){};

Searcher.searchStation = function(json,callback){
    if(typeof(json) == 'object' && json.SendLocationInfo.Location_X != null){
        var path = url.baidu.searcherPath;
        path = path.replace('location_X',json.SendLocationInfo.Location_X);
        path = path.replace('location_Y',json.SendLocationInfo.Location_Y);
        path = path.replace('QUERY','公交站');
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
    var xml = response.responseText(req,content);
    return xml;
};

Searcher.direct = function(json,callback){
    var index = json.Content.indexOf("到");
    if(typeof(json) == 'object' && index > 0 && index < json.Content.length - 1){
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

Searcher.search = function(json,callback){
    var name = json.FromUserName;
    var content = json.Content;
    var index = content.indexOf('附近');
    if(typeof(json) == 'object' && index == 0 && index < content.length - 2){
        user.getUser(name,function(err,doc){
            if(err){
                callback(err);
            }else{
                var path = url.baidu.searcherPath;
                var query = content.slice(2,content.length);
                path = path.replace('location_X',doc.latitude);
                path = path.replace('location_Y',doc.longitude);
                path = path.replace('QUERY',query);
                var options = {
                    hostname :url.baidu.hostname,
                    path:path,
                    method:'GET'
                };
                utils.requestBaidu(options,callback);
            }
        });
    }else{
       callback(new Error("出现错误!"));
    }
};

Searcher.responseSearch = function(req,data){
    var content = new Array();
    var query = req.body.Content.slice(2);
    var item = {
        Title:"查询结果",
        Description:"",
        PicUrl:"",
        Url:""
    }
    content.push(item);
    for(var index in data){
        var item = {
          Title:data[index].name + ":/n" + data[index].address,
          Description:"",
          PicUrl:"",
          Url:""
        };
        content.push(item);
    }
};

module.exports = Searcher;