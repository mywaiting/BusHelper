/**
 * Created by root on 15-1-21.
 */

var express = require('express');
var router = express.Router();
var searcher = require("../businesses/searcher");
var User = require("../businesses/user");

router.get('/',function(req,res){
    res.end(req.query.echostr);
});

router.post('/',function(req, res){
    switch(req.body.MsgType){
        case 'event':
            //用户触发事件
            switch(req.body.Event){
                case 'location_select':
                    //自定义菜单上报位置的事件
                    searcher.searchStation(req.body,function(err,data){
                        if(err){
                            console.log(err);
                            res.end();
                        }else{
                            console.log(searcher.responseStation(req,data));
                            res.end();
                        }
                    });
                    break;
                case 'LOCATION':
                    //用户自动上报位置的事件
                    var json = {
                        name:req.body.FromUserName,
                        latitude:req.body.Latitude,
                        longitude:req.body.Longitude
                    };
                    User.setUser(json,function(err){
                        if(err) console.log(err);
                        res.end();
                    });
                    break;
                case 'subscribe':
                    //用户订阅触发的事件
                    break;
                case 'unsubscribe':
                    //用户取消订阅触发的事件
                    break;
                default :
                    res.end();
                    break;
            }
            break;
        case 'text':
            //用户发送文本
            if(req.body.Content.match("到")){
                searcher.direct(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        data = JSON.parse(data);
                        console.log(data.result);
                        res.end();
                    }
                });
            }
            if(req.body.Content.match("附近")){
                searcher.search(req.body,function(err,data){
                    if(err){
                        console.log(err);
                        res.end();
                    }else{
                        console.log(data);
                        res.end();
                    }
                });
            }
            break;
        default :
            console.log('error');
            break;
    }
});


module.exports = router;