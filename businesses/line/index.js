/**
 * Created by root on 15-2-3.
 */
var redis = require("redis");
var response = require("../response");
function DaoLine(){}

DaoLine.getAllLine = function(json,callback){
    var lines = "1,2,3,4,5,5B,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25B,26,27,28,29,30,31,201,202,203,204,205,K01,K02";
    var array = lines.split(",");
    var content = "全部公交线路:\n";
    for(var i in array){
        content += "<a href='http://120.24.80.233/line?station=" + array[i] + "-1'>" + array[i] + "</a>\n";
    }
    var xml = response.responseText(json,content);
    callback(xml);
}

DaoLine.getLine = function(json,callback){
    var client = redis.createClient();
    var name = json.Content + "H";
    client.hgetall(name,function(err,doc){
        if(err) callback(err);
        else{
            if(doc){
                var direct = json.Content.slice(json.Content.indexOf("-") + 1);
                if(direct == "1"){
                    var station = json.Content.slice(0,json.Content.indexOf("-")) + "-2";
                    var content = "\ue231<a href='http://120.24.80.233:80/line?station=" + station + "'>反方向</a>\ue230\n";
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