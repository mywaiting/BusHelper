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

orm.connect opts, (err, db)->
    console.log err
    console.log "db"
    console.log db
    console.log orm.db

module.exports = {

}