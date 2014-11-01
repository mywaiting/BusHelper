xmlDigester = require "xml-digester"
express = require 'express'
router = express.Router()
fs = require "fs"

router.post '/', (req, res)->
	console.log req.headers
	console.log req.body
	res.end()

module.exports = router
