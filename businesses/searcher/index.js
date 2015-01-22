/**
 * Created by root on 15-1-22.
 */
var url = require("../../db/models/url");
var http = require('http');

function Searcher(){};

Searcher.searchStation = function(json,callback){
    if(typeof(json) == 'object' && json.SendLocationInfo.Location_X != null){
        var path = url.baidu.searcherPath;
        path = path.replace('location_X',json.SendLocationInfo.Location_X);
        path = path.replace('location_Y',json.SendLocationInfo.Location_Y);
        var options = {
            hostname :'api.map.baidu.com',
            path:path,
            method:'GET'
        }
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

module.exports = Searcher;