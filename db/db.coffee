
caminte = require 'caminte' 
Schema = caminte.Schema
config = {
     driver     : "mysql",
     host       : "localhost",
     port       : "3306",
     username   : "bushelper",
     password   : "zhaojian",
     database   : "bushelper"
     pool       : false 
};

module.exports = new Schema(config.driver, config);