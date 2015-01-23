/**
 * Created by root on 15-1-21.
 */
//var xmlDigester = require("xml-digester");
var express = require('express');
var router = express.Router();
//var fs = require("fs");
var http = require('http');
var searcher = require("../businesses/searcher");
var utils = require("../businesses/utils");

//var Station = require("../businesses/station");

router.get('/',function(req,res){
    res.end(req.query.echostr);
});

router.post('/',function(req, res){
    switch(req.body.MsgType){
        case 'event':
            switch(req.body.EventKey){
                case 'searchStation':
                    searcher.searchStation(req.body,function(err,data){
                        if(err){
                            res.end(err);
                        }else{
                            res.end(searcher.responseStation(req,data));
                        }
                    });
                    break;
                default :
                    console.log('error2');
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