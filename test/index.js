/**
 * Created by root on 15-1-21.
 */
var chai = require('chai');
chai.should();

var app = require("../app.js");
var request = (require("supertest"))(app);
var utils = require('../businesses/utils');

var str =   "<xml>" +
    "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[附近酒店]]></Content>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

var json = {
    ToUserName: 'owWqluO0UiXVM0oBIDcDXF-TPYfs',
    FromUserName: 'randomplayer',
    CreateTime: '1348831860',
    MsgType: 'text',
    Content: 'this is a test',
    MsgId: '1234567890123456'
};

var userLocation = "<xml>" +
    "<ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1408091189</CreateTime>" +
    "<MsgType><![CDATA[event]]></MsgType>" +
    "<Event><![CDATA[LOCATION]]></Event>" +
    "<Latitude>23.037725</Latitude>" +
    "<Longitude>113.394302</Longitude>" +
    "<Precision>119.385040</Precision>" +
    "</xml>";

var location = "<xml>" +
    "<ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1408091189</CreateTime>" +
    "<MsgType><![CDATA[event]]></MsgType>" +
    "<Event><![CDATA[location_select]]></Event>" +
    "<EventKey><![CDATA[searchStation]]></EventKey>" +
    "<SendLocationInfo><Location_X><![CDATA[23]]></Location_X>" +
    "   <Location_Y><![CDATA[113]]></Location_Y>" +
    "   <Scale><![CDATA[15]]></Scale>" +
    "   <Label><![CDATA[ 广州市海珠区客村艺苑路 106号]]></Label>" +
    "   <Poiname><![CDATA[]]></Poiname>" +
    "</SendLocationInfo>" +
    "</xml>";

var currentMap = "<xml>" +
    "<ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>123456789</CreateTime>" +
    "<MsgType><![CDATA[event]]></MsgType>" +
    "<Event><![CDATA[CLICK]]></Event>" +
    "<EventKey><![CDATA[near_map]]></EventKey>" +
"</xml>";

describe("测试:",function(){
    before(function(done){
        done();
    });
    after(function(done){
        done();
    });

    describe("测试查找公交站",function(){
        it("解析xml",function(done){
            request.post("/")
                .set("Content-Type", "text/xml")
                .expect(200)
                .send(location)
                .end(function(err,res){
                console.log(res.res.text);
                done(err);
            })
        });
    });

    describe("测试更新用户位置:",function(){
        it("测试开始:",function(done){
            request.post("/")
                .set("Content-Type","text/xml")
                .expect(200)
                .send(userLocation)
                .end(function(err,res){
                    console.log(res.res.text);
                    done(err);
                });
        });
    });

    describe("测试导航",function(){
        it("解析xml",function(done){
            request.post("/")
                .set("Content-Type", "text/xml")
                .expect(200)
                .send(str)
                .end(function(err,res){
                    console.log(res.res.text);
                    done(err);
                })
        });
    });

    describe("测试查看附近地图",function(){
        it("测试开始",function(done){
            request.post("/")
                .set("Content-Type","text/xml")
                .expect(200)
                .send(currentMap)
                .end(function(err,res){
                    console.log(res.res.text);
                    done(err);
                })
        });
    });
});

