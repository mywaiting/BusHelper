/**
 * Created by root on 15-1-21.
 */
var js2xmlparser = require("js2xmlparser");
var http = require('http');
function Utils(){}

Utils.xmlFilter = function(xmlStr){
    xmlStr = xmlStr.replace(/&lt;/g, "<");
    xmlStr = xmlStr.replace(/&gt;/g, ">");
    return xmlStr;
};

Utils.mime = function(req){
  var str = req.headers['content-type'] || '';
  var i = str.indexOf(';');
    if(~i){
        return str.slice(0,i);
    }else{
        return str;
    }
};

Utils.isArray = function(obj){
    if (typeof Array.isArray === "function") {
        return Array.isArray(obj);
    }else{
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
};



Utils.js2xml = function(json){
    var options = {
        useCDATA: true
    };
    var xml = js2xmlparser('xml',json,options);
    var reg = new RegExp(/<\?xml.*\?>\n/);
    xml = xml.replace(reg,"");
    var substr = xml.slice(xml.indexOf('<CreateTime>') + 12,xml.indexOf('</CreateTime>'));
    var replacement = xml.slice(xml.indexOf('<CreateTime>') + 21,xml.indexOf('</CreateTime>') - 3);
    xml = xml.replace(substr,replacement);
    return xml;
};

Utils.requestBaidu = function(options,callback){
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
};

module.exports = Utils;