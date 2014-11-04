xmlDigester = require "xml-digester"
express = require 'express'
router = express.Router()
fs = require "fs"

Station = require "../businesses/station"

router.post '/', (req, res)->
	station = new Station()
	addStationPosSuccess = (items)->
		res.end()
	addStationPosFail = (err)->
		res.end()

	station.addStationPos addStationPosSuccess, addStationPosFail
	

module.exports = router
