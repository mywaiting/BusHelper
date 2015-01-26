/**
 * Created by root on 15-1-24.
 */
var redis = require('redis');
var utils = require('../utils');
var url = require('../../db/models/url.js');
function DaoUser(){}

DaoUser.setUser = function(json,callback){
    var path = url.baidu.convert;
    var coords = json.longitude + "," + json.latitude;
    path = path.replace('COORDS',coords);
    var options = {
        hostname :url.baidu.hostname,
        path:path,
        method:'GET'
    };
    utils.requestBaidu(options,function(err,str){
        if(err) callback(err);
        else{
            var data = JSON.parse(str);
            data = data.result[0];
            json.longitude = data.x;
            json.latitude = data.y;
            var client = redis.createClient();
            client.hmset(json.name,{
                "latitude":json.latitude,
                "longitude":json.longitude
            },function(err){
                client.expire(json.name,600);
                callback(err);
                client.quit();
            });
        }
    });
}

DaoUser.getUser = function(name,callback){
    var client = redis.createClient();
    client.hgetall(name,function(err,doc){
        callback(err,doc);
        client.quit();
    });
}


module.exports = DaoUser;