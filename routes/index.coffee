xmlDigester = require "xml-digester"
express = require 'express'
router = express.Router()
fs = require "fs"

Station = require "../businesses/station"

router.post '/', (req, res)->
	station = new Station()
	addStationPosSuccess = (items)->
		console.log items
	addStationPosFail = (err)->
		console.log console.log err

	station.addStationPos addStationPosSuccess, addStationPosFail
	res.end()

module.exports = router
