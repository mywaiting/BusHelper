path = require 'path'
logger = require 'morgan'
express = require 'express'
favicon = require 'static-favicon'
bodyParser = require 'body-parser'

router = require './routes/index.coffee'

# router
app = express()

app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'
app.use favicon()
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded()
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
