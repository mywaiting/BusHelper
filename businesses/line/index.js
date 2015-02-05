/**
 * Created by root on 15-2-3.
 */
var redis = require("redis");
var response = require("../response");
function DaoLine(){}

DaoLine.getLine = function(json,callback){
    var client = redis.createClient();
    var name = json.Content + "H";
    client.hgetall(name,function(err,doc){
        if(err) callback(err);
        else{
            if(doc){
                var direct = json.Content.slice(json.Content.indexOf("-") + 1);
                if(direct == "1"){
                    var content = "";
                    content += "线路" + json.Content + "(" + doc.start + "-" + doc.end + ")\n";
                    for(var key in doc){
                        if(key != "start" && key != "end"){
                            if(doc[key] == 1){
                                content += key + "    \ue159\n";

                            }else{
                                content += key + "\n";
                            }
                        }
                    }
                    content += "\ue159表示公交车在该站附近,-1表示下行,-2表示上行.\n";
                    var station = json.Content.slice(0,json.Content.indexOf("-")) + "-2";
                    content += "<a href='http://120.24.80.233:80/line?station=" + station + "'>反方向</a>";
                    var xml = response.responseText(json,content);
                    callback(null,xml);
                }
            }
        }
        client.quit();
    });
}

DaoLine.getLineByGet = function(name,callback){
    var client = redis.createClient();
    var stationName = name + "H";
    client.hgetall(stationName,function(err,doc){
        if(err)callback(err);
        else{
            if(doc){
                var direct = name.slice(name.indexOf("-") + 1);
                var station = name.slice(0,name.indexOf("-"));
                if(direct == "1") station += "-2";
                else station += "-1";
                var head = "线路" + name + "(" + doc.start + "-" + doc.end + ")";
                var data = {
                    head:head,
                    doc:doc,
                    station:station
                };
                callback(null,data);
            }
        }
       client.quit();
    });
}

module.exports = DaoLine;