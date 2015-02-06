/**
 * Created by root on 15-1-21.
 */
var chai = require('chai');
chai.should();

var app = require("../app.js");
var request = (require("supertest"))(app);

var str =   "<xml>" +
    "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[附近酒店]]></Content>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

var direct = "<xml>" +
    "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[从广工到天河城]]></Content>" +
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

var currentMap = "<xml>" +
    "<ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>123456789</CreateTime>" +
    "<MsgType><![CDATA[event]]></MsgType>" +
    "<Event><![CDATA[CLICK]]></Event>" +
    "<EventKey><![CDATA[near_map]]></EventKey>" +
"</xml>";

var station = "<xml>" +
    "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[端州工业城]]></Content>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

var line = "<xml>" +
    "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[9路]]></Content>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

var allLines = "<xml>" +
    "<ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[MogHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
    "<CreateTime>123456789</CreateTime>" +
    "<MsgType><![CDATA[event]]></MsgType>" +
    "<Event><![CDATA[CLICK]]></Event>" +
    "<EventKey><![CDATA[route]]></EventKey>" +
    "</xml>";

describe("测试:",function(){
    before(function(done){
        done();
    });
    after(function(done){
        done();
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

    describe("测试附近",function(){
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

    describe("测试导航:",function(){
        it("测试开始",function(done){
           request.post("/")
               .set("Content-Type","text/xml")
               .expect(200)
               .send(direct)
               .end(function(err,res){
                   console.log(res.res.text);
                   done(err);
               })
        });
    });

    describe("测试查询公交站线路:",function(){
        it("测试开始",function(done){
            request.post("/")
                .set("Content-Type","text/xml")
                .expect(200)
                .send(station)
                .end(function(err,res){
                    console.log(res.res.text);
                    done(err);
                })
        });
    });

    describe("测试线路:",function(){
        it("测试开始",function(done){
            request.post("/")
                .set("Content-Type","text/xml")
                .expect(200)
                .send(line)
                .end(function(err,res){
                    console.log(res.res.text);
                    done(err);
                })
        });
    });

//    describe("测试查看全部线路:",function(){
//        it("测试开始",function(done){
//            request.post("/")
//                .set("Content-Type","text/xml")
//                .expect(200)
//                .send(allLines)
//                .end(function(err,res){
//                    console.log(res.res.text);
//                    done(err);
//                })
//        })
//    });

});

