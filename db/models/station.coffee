DB = require "../db.coffee"


class Station
    constructor: ()->
        self = this
        DB.on "db-connected", (db)->
            self.defineModel db

    defineModel: (db)->
        stationModel = db.define('station', {
            name: String
            lat: String
            lng: String
        })
        this.model = stationModel

    getModel: ()->
        return this.model

station = new Station()

module.exports = station