/**
 * Created by root on 15-1-21.
 */

var express = require('express');
var router = express.Router();
var searcher = require("../businesses/searcher");
var User = require("../businesses/user");
var utils = require("../businesses/utils");
var Url = require("../db/models/url.js");
var station = require("../businesses/station");
var line = require("../businesses/line");
var Function = require("../businesses/function");

router.get('/',function(req,res){
    utils.validateToken(req,res);
});


router.get('/walkDirection',function(req,res){
    var origin = req.query.origin;
    var destination = req.query.destination;
    var name = req.query.name;
    var path = "http://" + Url.baidu.hostname + Url.baidu.walkDirection;
    path = path.replace("ORIGIN",origin);
    path = path.replace("DESTINATION",destination);
    path = path.replace("NAME",name);
    return res.redirect(path);
});

router.get('/card',function(req,res){
    res.render('card');
});

router.get('/route',function(req,res){
    line.getLineInformation(function(err,data){
        if(err) console.log(err);
        else{
            res.render('allLines',{data:data});
        }
    });
});

router.get('/line',function(req,res){
    var station = req.query.station;
    var index = station.indexOf("-");
    var lines = "1,2,3,4,5,5B,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25B,26,27,28,29,30,31,201,202,203,204,205,K01,K02";
    if(index > 0){
        var lineNo = station.slice(0,index);
        var direct = station.slice(index + 1);
        if((direct == "1" || direct == "2") && lines.match(lineNo)){
            line.getLineByGet(station,function(err,data){
                if(err){
                    console.log(err);
                    res.end();
                }
                res.render('line',{data:data});
            });
        }
    }
});

router.post('/',function(req, res){
    switch(req.body.MsgType){
        case 'event':
            //用户触发事件
            switch(req.body.Event){
                case 'LOCATION':
                    //用户自动上报位置的事件
                    var json = {
                        name:req.body.FromUserName,
                        latitude:req.body.Latitude,
                        longitude:req.body.Longitude
                    };
                    json = utils.wgs2bd(json);
                    User.setUser(json,function(err){
                        if(err) console.log(err);
                        res.end();
                    });
                    break;
                case 'CLICK':
                    switch(req.body.EventKey){
                        case 'near_station':
                            //查看附近公交站
                            req.body.Content = "附近公交站";
                            searcher.search(req.body,function(err,data){
                                if(err){
                                    console.log(err);
                                    res.end();
                                }else{
                                    res.end(data);
                                }
                            });
                            break;
                        case 'near_food':
                            req.body.Content = "附近美食";
                            searcher.search(req.body,function(err,data){
                                if(err){
                                    console.log(err);
                                    res.end();
                                }else{
                                    res.end(data);
                                }
                            });
                            break;
                        case 'near_shop':
                            req.body.Content = "附近超市";
                            searcher.search(req.body,function(err,data){
                                if(err){
                                    console.log(err);
                                    res.end();
                                }else{
                                    res.end(data);
                                }
                            });
                            break;
                        case 'near_map':
                            //用户点击菜单的查看附近地图按钮
                            searcher.currentMap(req.body,function(err,data){
                                if(err){
                                   console.log(err);
                                    res.end();
                                }else{
                                    res.end(data);
                                }
                            });
                            break;
                        case 'help':
                            //用户点击菜单的帮助按钮
                            Function.help(req.body,function(data){
                                res.end(data);
                            });
                            break;
//                        case 'route':
//                            //用户点击公交线路按钮
//                            line.getAllLine(req.body,function(data){
//                                res.end(data);
//                            });
//                            break;
                        case 'about':
                            //用户点击关于按钮
                            Function.about(req.body,function(data){
                                res.end(data);
                            });
                            break;
                        case 'news':
                            //用户点击公交新闻按钮
                            Function.news(req.body,function(data){
                                res.end(data);
                            });
                            break;
                        case 'cooperation':
                            //用户点击商务合作按钮
                            Function.cooperation(req.body,function(data){
                                res.end(data);
                            });
                            break;
                        default:
                            res.end();
                            break;
                    }
                    break;
                case 'subscribe':
                    //用户订阅触发的事件
                    Function.help(req.body,function(data){
                        res.end(data);
                    });
                    break;
                case 'unsubscribe':
                    //用户取消订阅触发的事件
                    res.end();
                    break;
                default:
                    res.end();
                    break;
            }
            break;
        case 'text':
            //所有公交线路的名字组成的字符串
            var lines = "1,2,3,4,5,5B,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25B,26,27,28,29,30,31,201,202,203,204,205,K01,K02";
            //用户发送文本
            var flag = true;
            if(flag && req.body.Content.match("到")){
                flag = false;
                searcher.direct(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        res.end(data);
                    }
                });
            }
            if(flag && req.body.Content.match("附近")){
                flag = false;
                searcher.search(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        res.end(data);
                    }
                });
            }
            if(flag){
                var content = req.body.Content.toUpperCase();
                if(content.indexOf("路") > 0 || content.indexOf("线") > 0)
                    content = content.slice(0,content.length - 1);
                if(lines.match(content)){
                    flag = false;
                    req.body.Content = content + "-1";
                    line.getLine(req.body,function(err,data){
                        if(err){
                            console.log(err);
                            res.end();
                        }else{
                            res.end(data);
                        }
                    });
                }
            }
            if(flag){
                station.response(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        res.end(data);
                    }
                });
            }
            break;
        default:
            console.log('error');
            res.end();
            break;
    }
});


module.exports = router;