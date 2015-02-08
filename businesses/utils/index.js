/**
 * Created by root on 15-1-21.
 */
var js2xmlparser = require("js2xmlparser");
var http = require('http');
var crypto = require('crypto');

function sha1(str) {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

function Utils(){}

var pi = 3.14159265358979324;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;

function gcj2bd(json){
    var x = json.longitude;
    var y = json.latitude;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y,x) + 0.000003 * Math.cos(x * x_pi);
    var lng = z * Math.cos(theta) + 0.0065;
    var lat = z * Math.sin(theta) + 0.006;
    json.longitude = lng;
    json.latitude = lat;
    return json;
}

function transformLat(x,y)
{
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x,y)
{
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

function wgs2gcj(json){
    var wgLon = json.longitude;
    var wgLat = json.latitude;
    var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
    var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
    var radLat = wgLat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var mgLat = parseFloat(wgLat) + dLat;
    var mgLon = parseFloat(wgLon) + dLon;
    json.longitude = mgLon;
    json.latitude = mgLat;
    return json;
}

Utils.wgs2bd = function(json){
    json = wgs2gcj(json);
    json = gcj2bd(json);
    return json;
};

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

Utils.validateToken = function(req,res){
    var query = req.query;
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "hello";//这里填写你的token
    oriArray.sort();
    var original = oriArray[0]+oriArray[1]+oriArray[2];
    var scyptoString = sha1(original);
    if (signature == scyptoString) {
        res.end(echostr);
    }
    else {
        res.end("Bad Token!");
    }
};

module.exports = Utils;