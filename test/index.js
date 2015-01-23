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
    "<FromUserName><![CDATA[owWqluO0UiXVM0oBIDcDXF-TPYfs]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[this is a test]]></Content>" +
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

var location = "<xml>" +
    "<ToUserName><![CDATA[gh_e136c6e50636]]></ToUserName>" +
    "<FromUserName><![CDATA[oMgHVjngRipVsoxg6TuX3vz6glDg]]></FromUserName>" +
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

describe("测试解析和生成xml",function(){
    before(function(done){
        done();
    });
    after(function(done){
        done();
    });

    describe("测试解析xml：",function(){
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

    describe("测试生成xml:",function(){
        it("生成xml",function(done){
            var xml = utils.js2xml(json);
            if(xml){
                //console.log(xml);
                done();
            }else{
                throw new error("生成xml失败!");
            }
        });
    });
});

