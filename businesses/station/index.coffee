js2xmlparser = require "js2xmlparser"
utils = require "../utils"

StationModel = require '../../db/models/station'

class Station
    constructor: ()->

    getStationPos: ()->
        console.log "hello"

    addStationPos: (success_cb, fail_cb)->
        stationModel = StationModel.getModel()
        stationModel.create [{name: "肇庆体育中心", lat: "40.056878", lng: "116.30815"}], (err, items)->
            if err
                fail_cb err
            success_cb items

    updateStationPos: ()->
        console.log "hello"

    deleteStaionPos: ()->
        console.log "hello"
    
    jsonToXml: ()->
        data = {
            "ToUserName": "<![CDATA[owWqluO0UiXVM0oBIDcDXF-TPYfs]]>",
            "FromUserName": "<![CDATA[CyrilZhao]]>",
            "CreateTime": parseInt((new Date()).getTime() / 1000),
            "MsgType": "<![CDATA[text]]>",
            "Content": "<![CDATA[你好，世界]]>"
        }

        xml = js2xmlparser "xml", data

        return utils.xmlFilter xml

module.exports = Station