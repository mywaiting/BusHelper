xmlDigester = require "xml-digester"
express = require 'express'
router = express.Router()
fs = require "fs"

Station = require "../businesses/station"

router.post '/', (req, res)->
	
	res.end()

module.exports = router
