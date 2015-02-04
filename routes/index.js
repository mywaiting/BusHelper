/**
 * Created by root on 15-1-21.
 */

var express = require('express');
var router = express.Router();
var searcher = require("../businesses/searcher");
var User = require("../businesses/user");
var utils = require("../businesses/utils");
var response = require("../businesses/response");
var Url = require("../db/models/url.js");
var station = require("../businesses/station");
var line = require("../businesses/line");

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
    console.log(path);
    return res.redirect(path);
});

router.post('/line',function(req,res){
    var station = req.query.station + "-2";
    var json = {
        Content:station
    }
    line.getLine(json,function(err,data){
        if(err){
            console.log(err);
            res.end();
        }
        res.render('index',{div:data});
    });
});

router.post('/',function(req, res){
    console.log(req.body);
    switch(req.body.MsgType){
        case 'event':
            //用户触发事件
            switch(req.body.Event){
                case 'location_select':
                    //自定义菜单上报位置的事件
                    res.end();
                    break;
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
                            var content = '<a href="http://api.map.baidu.com/direction?origin=latlng:23.0414054368152,113.40674202172153|name:当前位置&destination=latlng:23.049785,113.406904|name:大学城南&mode=walking&region=广州&output=html&src=src">欢迎使用肇庆无线公交查询.</a>';
                            var xml = response.responseText(req.body,content);
                            res.end(xml);
                        default:
                            res.end();
                            break;
                    }
                    break;
                case 'subscribe':
                    //用户订阅触发的事件
                    var content = "欢迎使用肇庆无线公交查询.";
                    var xml = response.responseText(req.body,content);
                    console.log(xml);
                    res.end(xml);
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
            var content = req.body.Content.toUpperCase()
            if(flag && lines.match(content)){
                flag = false;
                req.body.Content += "-1";
                line.getLine(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        res.end(data);
                    }
                });
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