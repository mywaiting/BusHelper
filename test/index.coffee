chai = require "chai"
chai.should()

app = require "../app.coffee"
request = (require "supertest")(app)

str =   "<xml>" +
            "<ToUserName><![CDATA[randomplayer]]></ToUserName>" +
            "<FromUserName><![CDATA[owWqluO0UiXVM0oBIDcDXF-TPYfs]]></FromUserName>" + 
            "<CreateTime>1348831860</CreateTime>" +
            "<MsgType><![CDATA[text]]></MsgType>" +
            "<Content><![CDATA[this is a test]]></Content>" +
            "<MsgId>1234567890123456</MsgId>" +
        "</xml>";

describe "测试解析和生成xml", ->
    before (done)->
        done()
    after (done)->
        done()

    describe "测试解析xml：", ->
        it "解析xml", (done)->
            request.post("/")
                   .set("Content-Type", "text/xml")
                   .expect(200)
                   .send(str)
                   .end (err, res)->
                        
                        done()

      