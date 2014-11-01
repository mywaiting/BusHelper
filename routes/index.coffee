js2xmlparser = require "js2xmlparser"
express = require 'express'
router = express.Router()
fs = require "fs"

router.get '/', (req, res)->
	data = {
	    "firstName": "John",
	    "lastName": "Smith",
	    "dateOfBirth": new Date(1964, 7, 26),
	    "address": {
	        "@": {
	            "type": "home"
	        },
	        "streetAddress": "3212 22nd St",
	        "city": "Chicago",
	        "state": "Illinois",
	        "zip": 10000
	    },
	    "phone": [
	        {
	            "@": {
	                "type": "home"
	            },
	            "#": "123-555-4567"
	        },
	        {
	            "@": {
	                "type": "cell"
	            },
	            "#": "456-555-7890"
	        }
	    ],
	    "email": ()-> return "john@smith.com"
	    "notes": "John's profile is not complete."
	}

	xml = js2xmlparser("xml", data)

	fs.writeFile "xml", xml, ()->
		console.log "output compelete"
		console.log xml
		res.end()

module.exports = router
