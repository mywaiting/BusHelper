/**
 * Created by root on 15-2-6.
 */
var response = require('../response');

function Function(){}

Function.cooperation = function(json,callback){
    var content = "广州紫睿科技有限公司\n" +
        "联系人:蔡生\n" +
        "联系方式:17702036624\n" +
        "地址:广州市大学城外环西路100号国家电路集成基地216\n" +
        "肇庆市公共汽车有限公司\n" +
        "广告电话:0758-2903886\n" +
        "地址:肇庆市站前西路肇庆市公共";
    var xml = response.responseText(json,content);
    callback(xml);
}

Function.help = function(json,callback){
    var content = "欢迎使用肇庆无线公交!\ue159\n" +
        "1.发送公交线路名称(例如15或15路或15线)可查看该线路公交车到了哪个站.\n" +
        "2.发送站名(例如北门)可以查看经过该站的路线.\n" +
        "3.发送附近XX(例如附近公交站,附近美食)可查看周围情况.\n" +
        "4.发送从XX(地名)到XX(地名)(例如从市法院到北门)可查看导航信息\n" +
        "5.发送到XX(地名)可查看从当前位置到目的地的导航信息.";
    var xml = response.responseText(json,content);
    callback(xml);
}

Function.about = function(json,callback){
    var content = "肇庆市公共汽车有限公司是市交通集团有限公司属下的全资子公司，主要担负我市城区客运任务。现有营运线路29条，其中城区线路18条，郊外线路11条，公交车辆369辆，线网覆盖东至鼎湖贝水镇，西至高要西江船厂，南至高要马安陶瓷厂，北至北岭肇庆学院。城区每天从早上6:30-23:30时都有公交车服务。投诉电话：2721353。";
    var xml = response.responseText(json,content);
    callback(xml);
}

Function.news = function(json,callback){
    var item1 = {
        Title:"肇庆公交新闻",
        Description:"",
        PicUrl:"http://www.zhaoqingbus.com.cn/_c_npPyGEI3yCifopTkN3q4Lca-IirFKvqabSm2x_MuK6OJ-F7XQBUj9LhUZFfWHUE10uMQmGoxB-FSMy935hVf3sTzAi1NTr8u.jpg" ,
        Url:""
    };
    var item2 = {
        Title:"趣士多连锁店开通岭南通•肇庆通",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276731868.htm"
    };
    var item3 = {
        Title:"公交司机对小偷英勇发声：别在我车上闹事",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276684370.htm"
    };
    var item4 = {
        Title:"公交服务用真心  热心助人为快乐",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276684368.htm"
    };
    var item5 = {
        Title:"通告",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276657718.htm"
    };
    var item6 = {
        Title:"11路线调整通告",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276622897.htm"
    }
    var item7 = {
        Title:"拾金不昧展美德 雷锋精神在公交",
        Description:"",
        PicUrl:"",
        Url:"http://www.zhaoqingbus.com.cn/_d276619244.htm"
    }
    var content = new Array(item1,item2,item3,item4,item5,item6,item7);
    var xml = response.responseNews(json,content);
    callback(xml);
}

module.exports = Function;