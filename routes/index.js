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
    res.write(req.echostr );
});

router.post('/',function(req, res){
    //console.log(req.body);
    //var station = new Station();
    var addStationPosSuccess = function(items){
        res.end();
    };
    var addStationPosFail = function(err){
        res.end();
    };
    //station.addStationPos(addStationPosSuccess,addStationPosFail);
    res.end();
});

router.post('/searchStation',function(req,res){
    var content = "";
    searcher.searchStation(req.body,function(err,data){
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            var results = data.results;
            if(results){
                if(utils.isArray(results)){
                    if(results.length > 0){
                        for(var key in results){
                            content += results[key].name + ':\n' + results[key].address + '\n';
                        }
                    }
                }else{
                    if(typeof(results) == 'object'){
                        content += results.name + ':\n' + results.address + '\n';
                    }
                }
            }
        }
        var createTime = new Date().getTime();
        var responseJson = {
            ToUserName:req.body.FromUserName,
            FromUserName:req.body.ToUserName,
            CreateTime:createTime,
            MsgType:'text',
            Content:content
        };
       // console.log(utils.js2xml(responseJson));
        res.end(utils.js2xml(responseJson));
    });
});

router.post('searchShop',function(req,res){});



module.exports = router;