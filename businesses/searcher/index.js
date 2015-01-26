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

Searcher.responseSearch = function(data,options){
    var content = new Array();
    var markers = "";
    var flag = true;
    for(var index in data){
        var item = {
            Title:data[index].name + ":" + data[index].address,
            Description:"",
            PicUrl:"",
            Url:""
        };
        if(flag) flag = false;
        else markers += "|";
        markers += data[index].location.lng + "," + data[index].location.lat;
        content.push(item);
    }
    var picurl = "http://api.map.baidu.com/staticimage?center=" +
        options.longitude +
        "," +
        options.latitude +
        "&width=640&height=320&zoom=17&markers=" + markers;
    var url = "http://api.map.baidu.com/staticimage?center=" +
        options.longitude +
        "," +
        options.latitude +
        "&width=1024&height=1024&zoom=17&markers=" + markers;
    var item = {
        Title:"查询结果",
        Description:"",
        PicUrl:picurl,
        Url:url
    };
    content.push(item);
    content = content.reverse();
    return content;
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
                utils.requestBaidu(options,function(err,str){
                    if(err){
                        callback(err);
                    }else{
                        var data = JSON.parse(str);
                        if(data.status == 0){
                            var results = data.results;
                            var options = {
                                latitude:doc.latitude,
                                longitude:doc.longitude
                            };
                            var content = Searcher.responseSearch(results,options);
                            var xml = response.responseNews(json,content);
                            callback(null,xml);
                        }else{
                            callback(data.message);
                        }
                    }
                });
            }
        });
    }else{
       callback(new Error("出现错误!"));
    }
};



module.exports = Searcher;