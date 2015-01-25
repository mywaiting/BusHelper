/**
 * Created by root on 15-1-24.
 */
var redis = require('redis');
function DaoUser(){}

DaoUser.setUser = function(json,callback){
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

DaoUser.getUser = function(name,callback){
    var client = redis.createClient();
    client.hgetall(name,function(err,doc){
        callback(err,doc);
        client.quit();
    });
}


module.exports = DaoUser;