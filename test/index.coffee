chai = require "chai"
chai.should()

app = require "../app.coffee"
request = (require "supertest")(app)

describe "测试解析和生成xml", ->
    before (done)->
        done()
    after (done)->
        done()

    describe "测试解析xml：", ->
        it "解析xml", (done)->
            request.post("/tags")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({name: "nodejs", appId: testAppId})
                   .end (err, res)->
                        done()

        it "管理员为应用一新增一个Tag，Tag名称为< 企业招聘 >", (done)->
            request.post("/tags")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({name: "企业招聘", appId: testAppId})
                   .end (err, res)->
                        done()

        it "管理员为应用二新增一个Tag，Tag名称为< php >", (done)->
            request.post("/tags")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({name: "php", appId: testAppId_1})
                   .end (err, res)->
                        done()

        it "管理员为应用二新增一个Tag，Tag名称为< 企业招聘 >", (done)->
            request.post("/tags")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({name: "企业招聘", appId: testAppId_1})
                   .end (err, res)->
                        done()
    
    describe "管理员发布应用", ->
        it "发布应用二", (done)->
            request.put("/rabbitpres/#{testAppId_1}")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({isPublish: true, cols: JSON.stringify(["isPublish"])})
                   .end (err, res)->
                        done()

        it "发布应用一", (done)->
            request.put("/rabbitpres/#{testAppId}")
                   .expect(200)
                   .set('cookie', cookie)
                   .send({isPublish: true, cols: JSON.stringify(["isPublish"])})
                   .end (err, res)->
                        done()

    describe "管理员获取应用列表", ->
        it "管理员获取按照时间排序后的应用信息列表", (done)->
            request.get("/admin")
                   .expect(200)
                   .set('cookie', cookie)
                   .end (err, res)->
                        done()
                    

