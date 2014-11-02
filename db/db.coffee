orm = require 'orm' 
events = require "events"

class DB extends events.EventEmitter
    constructor: ()->
        self = this

        orm.connect "mysql://bushelper:zhaojian@localhost/bushelper", (err, db)->
            if err
                console.log err
            self.db = db
            self.emit "db-connected", db

    getInstance: ()->
        return this.db

module.exports = new DB()