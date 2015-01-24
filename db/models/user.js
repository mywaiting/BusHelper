/**
 * Created by root on 15-1-24.
 */
var schema = require('../db.js');

var User = schema.define('User',{
    name:String,
    latitude:String,
    longitude:String
});
module.exports = User;