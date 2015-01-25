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
            switch(req.body.Event){
                case 'location_select':
                    searcher.searchStation(req.body,function(err,data){
                        if(err){
                            res.end(err);
                        }else{
                            res.end(searcher.responseStation(req,data));
                        }
                    });
                    break;
                case 'LOCATION':
                    var json = {
                        name:req.body.FromUserName,
                        latitude:req.body.Latitude,
                        longitude:req.body.Longitude
                    };
                    var user = new User();
                    user.addUser(json,function(err,doc){
                        if(err){
                            console.log(err);
                        }else{
                            console.log(doc);
                        }
                        res.end();
                    });
                    break;
                default :
                    res.end();
                    break;
            }
            break;
        case 'text':
            if(req.body.Content.match("到")){
                searcher.direct(req.body,function(err,data){
                    if(err){
                        res.end(err);
                    }else{
                        data = JSON.parse(data);
                        console.log(data.result);
                        res.end(data.status);
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