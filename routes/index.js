/**
 * Created by root on 15-1-21.
 */

var express = require('express');
var router = express.Router();
var searcher = require("../businesses/searcher");
var User = require("../businesses/user");
var utils = require("../businesses/utils");
var response = require("../businesses/response");

router.get('/',function(req,res){
    utils.validateToken(req,res);
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
                            searcher.currentMap(req.body,function(err,data){
                                if(err){
                                   console.log(err);
                                    res.end();
                                }else{
                                    res.end(data);
                                }
                            });
                            break;
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
            //用户发送文本
            var flag = true;
            if(req.body.Content.match("到") && flag){
                flag == false;
                searcher.direct(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        res.end(data);
                    }
                });
            }
            if(req.body.Content.match("附近") && flag){
                flag == false;
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
                res.end();
            }
            break;
        default:
            console.log('error');
            res.end();
            break;
    }
});


module.exports = router;