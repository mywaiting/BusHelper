/**
 * Created by root on 15-1-21.
 */
var caminte = require('caminte');
var Schema = caminte.Schema;
var config = {
    driver     : "redis",
    host       : "localhost",
    port       : "6379"
};

var schema = new Schema(config.driver, config);
module.exports = schema;