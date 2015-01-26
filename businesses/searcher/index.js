/**
 * Created by root on 15-1-22.
 */
var url = require("../../db/models/url");
var utils = require("../utils");
var response = require('../response');
var user = require('../user');

function Searcher(){};

Searcher.responseSearch = function(data,options){
    var content = new Array();
    var markers = options.longitude + "," + options.latitude;
    var labelsstyle = ",1,14,0xffffff,0x000fff,1";
    var labels = "当前位置" + labelsstyle;
    for(var index in data){
        var item = {
            Title:data[index].name + ":" + data[index].address,
            Description:"",
            PicUrl:"",
            Url:""
        };
        labels += "|" + data[index].name + labelsstyle;
        markers += "|" + data[index].location.lng + "," + data[index].location.lat;
        content.push(item);
    }
    var picurl = "http://api.map.baidu.com/staticimage?center=" +
        options.longitude +
        "," +
        options.latitude +
        "&width=640&height=320&zoom=16&markers=" + markers +
        "&labels=" + markers +
        "&labelStyles=" + labels;
    var url = "http://api.map.baidu.com/staticimage?center=" +
        options.longitude +
        "," +
        options.latitude +
        "&width=1024&height=1024&zoom=16&markers=" + markers +
        "&labels=" + markers +
        "&labelStyles=" + labels;
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
                if(doc.latitude && doc.longitude){
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
                }else{
                    callback('缓存里没有该用户信息');
                }
            }
        });
    }else{
       callback(new Error("出现错误!"));
    }
};



module.exports = Searcher;