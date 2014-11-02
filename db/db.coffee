orm = require 'orm' 

opts = {
    database: "bushelper" 
    protocol: "mysql" 
    host: "127.0.0.1" 
    username: "bushelper" 
    password: "zhaojian" 
    query: {
        pool: true
    }
}

orm.connect "mysql://bushelper:zhaojian@localhost/bushelper", (err, db)->
    if err
        console.log err

module.exports = {

}