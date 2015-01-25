/**
 * Created by root on 15-1-24.
 */

var User = require('../db/models/user.js');
var redis = require('redis');
function DaoUser(){}

DaoUser.setUser = function(json){
    var client = redis.createClient();
    client.hmset(json.name,{
        "latitude":json.latitude,
        "longitude":json.longitude
    },function(message){
        console.log(message);
        client.quit();
    });
}

DaoUser.getUser = function(name,callback){
    var client = redis.createClient();
    client.hgetall(name,function(err,doc){
        callback(err,doc);
        client.quit();
    });
}

DaoUser.deleteUser = function(name){
    var client = redis.createClient();
    client.del(name,function(message){
        console.log(message);
        client.quit();
    });
}

module.exports = DaoUser;