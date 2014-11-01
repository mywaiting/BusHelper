path = require 'path'
logger = require 'morgan'
xml2js = require 'xml2js' 
express = require 'express'
favicon = require 'static-favicon'
bodyParser = require 'body-parser'

router = require './routes/index.coffee'
utils = require './businesses/utils'

# 让express接收xml形式的POST请求
xmlBodyParser = (req, res, next)->
    if req._body?
        return text()

    req.body = req.body || {}

    # ignore GET
    if "GET" == req.method || 'HEAD' == req.method
        return next()

    if "text/xml" != utils.mime(req) and "text/plain" != utils.mime(req)
        return next()

    # flag as parsed
    req._body = true

    filter = (jsonObj)->
        for name, value of jsonObj
            if jsonObj.hasOwnProperty(name)
                if utils.isArray(jsonObj[name]) and jsonObj[name].length == 1
                    jsonObj[name] = jsonObj[name][0]
                else if typeof jsonObj[name] == "object"
                    jsonObj[name] = filter(jsonObj[name])
        return jsonObj

    # parse
    buf = ""
    req.setEncoding "utf-8"
    req.on "data", (chunk)->
        buf += chunk
    req.on "end", ()->
        xml2js.parseString buf, (err, json)->
            if err
                err.status = 400
                next(err)
            else
                json = filter json
                req.body = json.xml
                next()

# router
app = express()

app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'
app.use favicon()
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded()
app.use xmlBodyParser
app.use express.static(path.join(__dirname, 'public'))

# router
app.use '/', router

app.use (req, res, next)->
    err = new Error 'Not Found'
    err.status = 404
    next err

if app.get('env') is 'development' 
    app.use (err, req, res, next)->
        res.status err.status or 500
        res.render 'error', {
            message: err.message
            error: err
        }

app.use (err, req, res, next)->
    res.status err.status or 500
    res.render 'error', {
        message: err.message
        error: {}
    }

module.exports = app
