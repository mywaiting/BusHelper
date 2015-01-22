/**
 * Created by root on 15-1-21.
 */
var caminte = require('caminte');
var Schema = caminte.Schema;
var config = {
    driver     : "mysql",
    host       : "localhost",
    port       : "3306",
    username   : "root",
    password   : "1234",
    database   : "bushelper",
    pool       : false
};

module.exports = new Schema(config.driver, config);