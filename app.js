/**
 * Created by root on 15-1-21.
 */
var path = require('path');
var logger = require('morgan');
var xml2js = require('xml2js');
var express = require('express');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');

var router = require('./routes/index.js');
var utils = require('./businesses/utils');
var DB = require('./db/db.js');

var xmlBodyParser = function(req,res,next){
    if(req._body){
        return next();
    }

    req.body = req.body || {};

    if(req.method == "GET" || req.method == "HEAD"){
        return next();
    }

    if(utils.mime(req) != "text/xml" && utils.mime(req) != "text/plain"){
        return next();
    }

    req._body = true;

    var filter = function(jsonObj){
        for(var name in jsonObj){
            if(jsonObj.hasOwnProperty(name)){
                if(utils.isArray(jsonObj[name]) && jsonObj[name].length == 1){
                    jsonObj[name] = jsonObj[name][0];
                }
                if(typeof(jsonObj[name]) == 'object'){
                        jsonObj[name] = filter(jsonObj[name]);
                }
            }
        }
        return jsonObj;
    }

    var buf = "";
    req.setEncoding("utf-8");
    req.on("data",function(chunk){
        buf += chunk;
    });
    req.on("end",function(){
        xml2js.parseString(buf,function(err,json){
            if(err){
                err.status = 400;
                next(err);
            }else{
                json = filter(json);
                req.body = json.xml;
                next();
            }
        });
    });
}



var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(xmlBodyParser);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if(app.get('env') == 'development'){
    app.use(function(err,req,res,next){
        res.status = err.status || 500;
        res.render('error',{
            message:err.message,
            error:err
        });
    });
}

app.use(function(err,req,res,next){
    res.status = err.status || 500;
    res.render('error',{
        message:err.message,
        error:{}
    });
});

module.exports = app