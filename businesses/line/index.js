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
            var direct = json.Content.slice(json.Content.indexOf("-") + 1);
            var content = "";
            var array = new Array();

            if(direct == "1"){
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
                var station = json.Content.slice(0,json.Content.indexOf("-"));
                content += "<a href='http://120.24.80.233:80/line?station=" + station + "'>反方向</a>";
                var xml = response.responseText(json,content);
                callback(null,xml);
            }else{
                content += "线路" + json.Content + "(" + doc.start + "-" + doc.end + ")<br>";
                for(var key in doc){
                    if(key != "start" && key != "end"){
                        if(doc[key] == 1){
                            content += key + "    <img src='../src/gongjiao.png'/><br>";
                        }else{
                            content += key + "<br>";
                        }
                    }
                }
                content += "<img src='../src/gongjiao.png'/>表示公交车在该站附近,-1表示下行,-2表示上行.<br>";
                callback(null,content);
            }
        }
    });
}


module.exports = DaoLine;