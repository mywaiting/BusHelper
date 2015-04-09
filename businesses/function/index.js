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
        "地址:肇庆市站前西路肇庆市公共汽车有限公司";
    var xml = response.responseText(json,content);
    callback(xml);
}

Function.help = function(json,callback){
    var content = "欢迎使用肇庆无线公交!\ue159\n" +
        "1、即时公交：回复【公交线路名称】(例如15路)查看该路公交目前位置.\n\n" +
        "2、公交信息：回复【站名】(例如北门)查看经过该站的路线.\n\n" +
        "3、精准导航：回复【到xx】(目的地地名)查看当前位置到目的地.\n\n" +
        "4、便利出行：回复【xx(地名)到xx(地名)】查看出行路线."
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
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203688429&idx=1&sn=5aff5c649b0212f41fa3a22573427394#rd"
    };
    var item3 = {
        Title:"公交司机对小偷英勇发声：别在我车上闹事",
        Description:"",
        PicUrl:"",
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203688678&idx=1&sn=be37e3b9fe0a9808dcf24d9b69d3a0e5#rd"
    };
    var item4 = {
        Title:"公交服务用真心  热心助人为快乐",
        Description:"",
        PicUrl:"",
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203688850&idx=1&sn=913594ad0c902db199fdf9f7599426a4#rd"
    };
    var item5 = {
        Title:"30路线路延伸至北岭山森林公园通告",
        Description:"",
        PicUrl:"",
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203688173&idx=1&sn=b4eb5fc1c2ffe4aafb176d0dbbc0d3f3#rd"
    };
    var item6 = {
        Title:"26路线路延伸至北岭山森林公园通告",
        Description:"",
        PicUrl:"",
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203688313&idx=1&sn=6b12a360917fcd88cc5d5137f7373db5#rd"
    }
    var item7 = {
        Title:"拾金不昧展美德 雷锋精神在公交",
        Description:"",
        PicUrl:"",
        Url:"http://mp.weixin.qq.com/s?__biz=MzAxNzMyODAyNA==&mid=203689042&idx=1&sn=8e9e918ffb5e64e0636c2784b84b907e#rd"
    }
    var content = new Array(item1,item2,item3,item4,item5,item6,item7);
    var xml = response.responseNews(json,content);
    callback(xml);
}

module.exports = Function;