/**
 * Created by root on 15-1-21.
 */
var redis = require("redis");
var response = require("../response");

function Station(){}

Station.getLines = function(name,callback){
    var client = redis.createClient();
    client.llen(name,function(err,length){
        if(err) callback(err);
        else{
            client.lrange(name,0,length - 1,function(err,doc){
               callback(err,doc);
            });
        }
    });
}

Station.response = function(json,callback){
    var station = json.Content;
    var station1 = station + "-1";
    var station2 = station + "-2";
    Station.getLines(station1,function(err,data1){
        if(err) callback(err);
        else{
            Station.getLines(station2,function(err,data2){
                if(err) callback(err);
                else{
                    var content = "";
                    if(data1.length == 0 && data2.length == 0){
                        content += "您输入有误!";
                    }else{
                        if(data1.length != 0){
                            content += "经过" + station1 + "的路线:\n";
                            for(var index in data1){
                                content += data1[index] + "路\n";
                            }
                        }
                        if(data2.length != 0){
                            content += "经过" + station2 + "的路线:\n";
                            for(var index in data2){
                                content += data2[index] + "路\n";
                            }
                        }
                        content += "-1表示下行方向,-2表示上行方向.";
                    }
                    var xml = response.responseText(json,content);
                    callback(null,xml);
                }
            });
        }
    });
}

module.exports = Station;